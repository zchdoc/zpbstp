@echo off
setlocal enabledelayedexpansion

REM Multi-env docs auto-commit script (Windows)
REM Commit message format: docs: YYYYMMDD HHMM
REM Usage: auto-commit.bat [options]
REM   --yes  -y  Auto-pull remote updates without asking
REM
REM Default workflow:
REM   1. Fetch remote state.
REM   2. If remote is ahead, ask (or auto-yes) to pull first.
REM   3. If local changes exist before pull, commit them first to keep work safe.
REM   4. Stage, commit, and push local changes.

REM Step 1: Check if current directory is a git repository
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Not a git repository.
    pause
    exit /b 1
)

REM Step 2: Get current branch name
for /f "delims=" %%b in ('git symbolic-ref --short HEAD 2^>nul') do set "BRANCH=%%b"
if not defined BRANCH (
    echo [ERROR] Not on a branch. Cannot auto-commit in detached HEAD state.
    pause
    exit /b 1
)

REM Step 3: Parse command-line options
set "AUTO_YES=0"
if /I "%~1"=="--yes" set "AUTO_YES=1"
if /I "%~1"=="-y"     set "AUTO_YES=1"

REM Step 4: Fetch remote state
echo [INFO] Checking remote updates on !BRANCH!...
git fetch origin "!BRANCH!" >nul 2>&1
if errorlevel 1 (
    echo [WARN] Could not fetch from origin. Continue without remote check.
    goto :commit_local
)

REM Step 5: Check if local branch is behind origin
set "BEHIND=0"
for /f "delims=" %%c in ('git rev-list --count HEAD..origin/!BRANCH! 2^>nul') do set "BEHIND=%%c"

if "!BEHIND!"=="0" goto :commit_local

echo [INFO] Remote has !BEHIND! new commit(s) on !BRANCH!.

REM Step 6: Ask whether to pull first (or auto-yes)
if "!AUTO_YES!"=="1" (
    echo [INFO] Auto-yes enabled: pulling remote updates...
    goto :do_pull
)

choice /C YN /N /M "Pull remote updates before committing? [Y/n] "
if errorlevel 2 (
    echo [WARN] Skipping pull. Push may fail if remote is ahead.
    goto :commit_local
)

:do_pull
REM Step 7: If local changes exist, commit them before pull to keep work safe
set "DIRTY=0"
for /f "delims=" %%x in ('git status --porcelain') do (
    set "DIRTY=1"
    goto :after_dirty_check
)
:after_dirty_check

if "!DIRTY!"=="1" (
    echo [INFO] Local changes detected. Committing them before pull to keep work safe...

    for /f "delims=" %%i in ('powershell -NoProfile -Command "Get-Date -Format 'yyyyMMdd HHmm'"') do set "TIMESTAMP=%%i"
    set "MSG=docs: !TIMESTAMP!"

    git add -A
    git commit -m "!MSG!"
    if errorlevel 1 (
        echo [ERROR] Pre-pull commit failed. See the message above.
        pause
        exit /b 1
    )
    echo [INFO] Pre-pull commit created: !MSG!
)

REM Step 8: Pull updates
echo [INFO] Pulling updates from origin/!BRANCH!...
git pull origin "!BRANCH!"
if errorlevel 1 (
    echo [ERROR] Pull failed. Please resolve conflicts manually and run the script again.
    pause
    exit /b 1
)

:commit_local
REM Step 9: Get current timestamp for the final commit message
for /f "delims=" %%i in ('powershell -NoProfile -Command "Get-Date -Format 'yyyyMMdd HHmm'"') do set "TIMESTAMP=%%i"

REM Step 10: Build commit message
set "MSG=docs: !TIMESTAMP!"

REM Step 11: Stage all changes (added / modified / deleted)
git add -A

REM Step 12: Check if there is anything staged to commit
git diff --cached --quiet
if not errorlevel 1 (
    echo [INFO] Nothing to commit. Working tree clean.
    pause
    exit /b 0
)

REM Step 13: Commit
git commit -m "!MSG!"
if errorlevel 1 (
    echo [ERROR] Commit failed. See the message above.
    pause
    exit /b 1
)

REM Step 14: Push to remote
echo [INFO] Pushing to origin/!BRANCH!...
git push origin "!BRANCH!"
if errorlevel 1 (
    echo [ERROR] Push failed. Check your remote / network.
    pause
    exit /b 1
)

REM Step 15: Done
echo.
echo [SUCCESS] Committed and pushed: !MSG!
pause
