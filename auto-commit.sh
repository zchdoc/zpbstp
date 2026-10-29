#!/bin/bash

# Multi-env docs auto-commit script (macOS / Linux)
# Commit message format: docs: YYYYMMDD HHMM
# Usage: ./auto-commit.sh [options]
#   --yes  -y  Auto-pull remote updates without asking
#
# Default workflow:
#   1. Fetch remote state.
#   2. If remote is ahead, ask (or auto-yes) to pull first.
#   3. If local changes exist before pull, commit them first to keep work safe.
#   4. Stage, commit, and push local changes.

# Step 1: Check if current directory is a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "[ERROR] Not a git repository."
    exit 1
fi

# Step 2: Get current branch name
BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
if [ -z "$BRANCH" ]; then
    echo "[ERROR] Not on a branch. Cannot auto-commit in detached HEAD state."
    exit 1
fi

# Step 3: Parse command-line options
AUTO_YES=0
if [ "$1" == "--yes" ] || [ "$1" == "-y" ]; then
    AUTO_YES=1
fi

# Step 4: Fetch remote state
echo "[INFO] Checking remote updates on $BRANCH..."
if ! git fetch origin "$BRANCH" > /dev/null 2>&1; then
    echo "[WARN] Could not fetch from origin. Continue without remote check."
else
    # Step 5: Check if local branch is behind origin
    BEHIND=$(git rev-list --count HEAD..origin/"$BRANCH" 2>/dev/null || echo 0)

    if [ "$BEHIND" -gt 0 ]; then
        echo "[INFO] Remote has $BEHIND new commit(s) on $BRANCH."

        # Step 6: Ask whether to pull first
        DO_PULL=0
        if [ "$AUTO_YES" -eq 1 ]; then
            echo "[INFO] Auto-yes enabled: pulling remote updates..."
            DO_PULL=1
        else
            read -r -p "Pull remote updates before committing? [Y/n] " answer
            if [[ "$answer" =~ ^[Yy]$ ]] || [ -z "$answer" ]; then
                DO_PULL=1
            else
                echo "[WARN] Skipping pull. Push may fail if remote is ahead."
            fi
        fi

        if [ "$DO_PULL" -eq 1 ]; then
            # Step 7: If local changes exist, commit them before pull to keep work safe
            if [ -n "$(git status --porcelain)" ]; then
                echo "[INFO] Local changes detected. Committing them before pull to keep work safe..."

                TIMESTAMP=$(date +"%Y%m%d %H%M")
                MSG="docs: $TIMESTAMP"

                git add -A
                if ! git commit -m "$MSG" > /dev/null 2>&1; then
                    echo "[ERROR] Pre-pull commit failed."
                    exit 1
                fi
                echo "[INFO] Pre-pull commit created: $MSG"
            fi

            # Step 8: Pull updates
            echo "[INFO] Pulling updates from origin/$BRANCH..."
            if ! git pull origin "$BRANCH"; then
                echo "[ERROR] Pull failed. Please resolve conflicts manually and run the script again."
                exit 1
            fi
        fi
    fi
fi

# Step 9: Get current timestamp for the final commit message
TIMESTAMP=$(date +"%Y%m%d %H%M")

# Step 10: Build commit message
MSG="docs: $TIMESTAMP"

# Step 11: Stage all changes (added / modified / deleted)
git add -A

# Step 12: Check if there is anything staged to commit
if git diff --cached --quiet; then
    echo "[INFO] Nothing to commit. Working tree clean."
    exit 0
fi

# Step 13: Commit
if ! git commit -m "$MSG"; then
    echo "[ERROR] Commit failed."
    exit 1
fi

# Step 14: Push to remote
echo "[INFO] Pushing to origin/$BRANCH..."
if ! git push origin "$BRANCH"; then
    echo "[ERROR] Push failed. Check your remote / network."
    exit 1
fi

# Step 15: Done
echo ""
echo "[SUCCESS] Committed and pushed: $MSG"
