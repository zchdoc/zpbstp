# auto-commit.sh 使用说明

> macOS / Linux 版通用文档自动提交脚本，适合在多台电脑、多个环境中协同维护个人文档仓库。

## 功能简介

这个脚本用于**个人文档类 git 仓库**的快速提交。它会：

1. 检查当前目录是否是 git 仓库。
2. 获取当前分支名称。
3. 拉取远程状态，检查当前分支是否落后于 `origin/<分支>`。
4. 如果远程有更新，询问你是否先拉取更新（避免推送失败）。
5. 如果本地有未提交的改动且你选择先拉取，会先把本地改动提交一次（保护工作），然后再拉取远程更新。
6. 暂存所有改动（新增、修改、删除的文件）。
7. 如果没有改动则直接退出（不产生空提交）。
8. 使用当前时间生成提交信息并提交，例如 `docs: 20260728 1430`。
9. 推送到远程仓库。

提交信息只包含时间，不包含具体改动内容，适合存储隐私文档、不希望暴露改动细节的场景。

## 推荐的工作流程

在多台设备或多地点协作时，推荐的 git 流程是：

```
拉取远程更新 → 提交本地改动 → 推送到远程
```

也就是 **先 pull，再 commit/push**。这样可以最大程度避免 `push` 时因为远程已经有新提交而失败。

脚本的默认行为就是遵循这个流程：

- 发现远程有更新时会先问你要不要 pull。
- 如果本地已经有改动，脚本会在 pull 之前先把这些改动提交一次（带时间戳），然后再 pull，避免改动被覆盖或拉取失败。
- 最后再把最新的本地改动提交并推送。

## 使用方式

**首次使用**，需要赋予脚本执行权限（只需执行一次）：

```bash
chmod +x auto-commit.sh
```

**运行脚本**：

```bash
./auto-commit.sh
```

**跳过询问、自动拉取更新**（适合你已经确认要 pull 的情况）：

```bash
./auto-commit.sh --yes
# 或
./auto-commit.sh -y
```

## 完整流程说明

```text
开始
  │
  ├─ 检查是否在 git 仓库内
  │     └─ 否 → 报错退出
  │
  ├─ 获取当前分支名
  │
  ├─ fetch 远程分支
  │     └─ 失败 → 跳过远程检查，继续本地提交
  │
  ├─ 本地是否落后于 origin？
  │     ├─ 否 → 跳到提交本地改动
  │     └─ 是 → 提示 "远程有 N 个新提交"
  │           │
  │           ├─ 用户选择 pull？
  │           │     ├─ 本地有未提交改动？
  │           │     │     ├─ 是 → 先提交本地改动（docs: 时间戳）
  │           │     │     └─ 否 → 直接 pull
  │           │     │
  │           │     └─ git pull origin <分支>
  │           │           └─ 失败 → 提示手动解决冲突
  │           │
  │           └─ 用户选择跳过 → 继续提交，但 push 可能失败
  │
  ├─ 生成提交信息 docs: YYYYMMDD HHMM
  ├─ git add -A
  ├─ 有改动？
  │     ├─ 否 → 提示 "Nothing to commit"，退出
  │     └─ 是 → git commit
  │
  ├─ git push origin <分支>
  │     └─ 失败 → 报错
  │
  └─ 输出成功信息
```

## 代码逐段解释

### 开头与命令行选项

```bash
#!/bin/bash
```

指定使用 `/bin/bash` 执行脚本。

```bash
AUTO_YES=0
if [ "$1" == "--yes" ] || [ "$1" == "-y" ]; then
    AUTO_YES=1
fi
```

解析第一个命令行参数。如果传了 `--yes` 或 `-y`，则设置 `AUTO_YES=1`，遇到远程更新时不询问，直接 pull。

### 检查 git 仓库与分支

```bash
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "[ERROR] Not a git repository."
    exit 1
fi
```

`git rev-parse --is-inside-work-tree` 判断当前目录是否在 git 仓库内。`> /dev/null 2>&1` 丢弃输出，只关心返回码。

```bash
BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
if [ -z "$BRANCH" ]; then
    echo "[ERROR] Not on a branch. Cannot auto-commit in detached HEAD state."
    exit 1
fi
```

获取当前分支名。`2>/dev/null` 在 detached HEAD 等异常情况下避免报错输出。

### 检查远程更新

```bash
if ! git fetch origin "$BRANCH" > /dev/null 2>&1; then
    echo "[WARN] Could not fetch from origin. Continue without remote check."
fi
```

只拉取远程分支的最新状态，不会修改本地代码。如果 fetch 失败（例如没网），脚本会给出警告并继续处理本地提交。

```bash
BEHIND=$(git rev-list --count HEAD..origin/"$BRANCH" 2>/dev/null || echo 0)
```

`git rev-list --count HEAD..origin/<分支>` 统计本地比远程少几个提交。结果是 `0` 表示本地已经是最新；大于 `0` 表示远程有更新。

### 询问是否先拉取

```bash
read -r -p "Pull remote updates before committing? [Y/n] " answer
if [[ "$answer" =~ ^[Yy]$ ]] || [ -z "$answer" ]; then
    DO_PULL=1
else
    echo "[WARN] Skipping pull. Push may fail if remote is ahead."
fi
```

`read -r -p` 提示用户输入。默认按回车算作 Y。输入 N/n 则跳过 pull，脚本继续提交，但会警告 push 可能失败。

如果传了 `--yes` 或 `-y`，则直接设置 `DO_PULL=1`，不再询问。

### pull 前保护本地改动

```bash
if [ -n "$(git status --porcelain)" ]; then
    echo "[INFO] Local changes detected. Committing them before pull to keep work safe..."
    ...
    git add -A
    git commit -m "$MSG" > /dev/null 2>&1
fi
```

`git status --porcelain` 是判断工作区是否干净的可靠方式。没有任何输出表示干净；有输出表示有改动。如果发现本地有改动，脚本会先提交一次，避免 pull 时发生冲突或覆盖。

### 拉取远程更新

```bash
if ! git pull origin "$BRANCH"; then
    echo "[ERROR] Pull failed. Please resolve conflicts manually and run the script again."
    exit 1
fi
```

从远程拉取并合并到当前分支。如果合并发生冲突，命令会失败，脚本提示你手动解决冲突后再次运行。

### 生成提交信息并提交

```bash
TIMESTAMP=$(date +"%Y%m%d %H%M")
MSG="docs: $TIMESTAMP"
```

用 `date` 命令获取稳定的时间格式 `YYYYmmdd HHMM`。

```bash
git add -A
if git diff --cached --quiet; then
    echo "[INFO] Nothing to commit. Working tree clean."
    exit 0
fi
```

先暂存所有改动，再检查暂存区是否有变化。`git diff --cached --quiet` 返回 0 表示没有改动；返回 1 表示有改动。没有改动时直接退出，避免空提交。

### 推送

```bash
if ! git push origin "$BRANCH"; then
    echo "[ERROR] Push failed. Check your remote / network."
    exit 1
fi
```

把当前分支推送到对应的远程分支。这样比在脚本里写死 `git push` 更明确，也避免在特殊分支上误操作。

## 多环境开发建议

1. **每次开始工作前先运行一次脚本并选择 pull**，这样本地始终和远程同步。
2. **不要同时长时间在两台设备上修改同一文件**，否则合并时容易产生冲突。
3. **如果冲突了**，脚本会停止并提示你手动解决。解决后再次运行脚本即可。
4. **可以在 crontab 或快捷脚本里使用 `./auto-commit.sh -y`**，实现无人值守的定时自动同步。

## 常见问题

### Q: 提示 Permission denied 怎么办？

脚本没有执行权限。运行一次 `chmod +x auto-commit.sh` 即可。

### Q: 提示 "Pull failed" 怎么办？

说明拉取时出现了冲突。你需要：

1. 运行 `git status` 查看冲突文件。
2. 手动编辑冲突文件，解决冲突。
3. 运行 `git add -A` 标记已解决。
4. 运行 `git commit` 完成合并。
5. 再次运行 `./auto-commit.sh` 推送。

### Q: 不想每次都被询问怎么办？

用 `./auto-commit.sh --yes` 或 `./auto-commit.sh -y`，脚本会在发现远程更新时自动 pull，不再询问。

### Q: 可以复制到其他项目用吗？

可以。这个脚本不依赖任何项目特定信息，复制到任意 git 仓库根目录即可使用。当前分支名会自动获取，远程默认为 `origin`。

### Q: Windows 上能用这个 .sh 脚本吗？

在 Git Bash、WSL 或其他 Bash 环境下可以使用。纯 Windows 环境请用 `auto-commit.bat`。

### Q: 提交信息想精确到秒？

把脚本里的 `%H%M` 改成 `%H%M%S` 即可。注意 Windows 和 Linux 版本要分别改对应脚本。

## 与 Windows 版的差异

两个脚本功能完全一致，唯一的区别在于获取时间的方式：

| | Windows (.bat) | macOS/Linux (.sh) |
|---|---|---|
| 获取时间 | PowerShell `Get-Date` | `date` 命令 |
| 原因 | `%date%` 受系统区域设置影响，格式不稳定 | `date` 命令格式统一稳定 |

这是因为在 Windows 上，`%date%` 和 `%time%` 的格式因系统语言/区域设置而异（可能输出 `2026/07/15` 或 `2026-07-15` 等），直接用不可靠；而 macOS/Linux 的 `date` 命令配合格式化参数输出稳定，无需额外处理。
