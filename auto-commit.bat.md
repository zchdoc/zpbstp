# auto-commit.bat 使用说明

> Windows 批处理版通用文档自动提交脚本，适合在多台电脑、多个环境中协同维护个人文档仓库。

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

**方式一**：双击 `auto-commit.bat` 文件运行。

**方式二**：在命令行中进入仓库目录，输入：

```bat
auto-commit.bat
```

**跳过询问、自动拉取更新**（适合你已经确认要 pull 的情况）：

```bat
auto-commit.bat --yes
:: 或
auto-commit.bat -y
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

```bat
@echo off
setlocal enabledelayedexpansion
```

- `@echo off`：关闭命令回显，避免把脚本里的每一行命令都打印出来。
- `setlocal enabledelayedexpansion`：开启局部变量环境，并启用延迟变量扩展。局部变量不会污染系统环境变量；延迟扩展允许在 `for` 循环等代码块中正确读取变量。

```bat
if /I "%~1"=="--yes" set "AUTO_YES=1"
if /I "%~1"=="-y"     set "AUTO_YES=1"
```

解析第一个命令行参数。`%~1` 表示去掉引号的第一个参数；`/I` 表示不区分大小写。如果传了 `--yes` 或 `-y`，则设置 `AUTO_YES=1`，遇到远程更新时不询问，直接 pull。

### 检查 git 仓库与分支

```bat
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Not a git repository.
    pause
    exit /b 1
)
```

`git rev-parse --is-inside-work-tree` 判断当前目录是否在 git 仓库内。`>nul 2>&1` 丢弃所有输出，只关心返回码。返回码非 0 说明不是 git 仓库。

```bat
for /f "delims=" %%b in ('git symbolic-ref --short HEAD 2^>nul') do set "BRANCH=%%b"
```

获取当前分支名。`2^>nul` 把错误输出丢弃（例如在 detached HEAD 状态时会失败）。`for /f` 把命令输出存到 `BRANCH` 变量中。

### 检查远程更新

```bat
git fetch origin "%BRANCH%" >nul 2>&1
```

只拉取远程分支的最新状态，不会修改本地代码。如果 fetch 失败（例如没网），脚本会给出警告并继续处理本地提交。

```bat
for /f "delims=" %%c in ('git rev-list --count HEAD..origin/%BRANCH% 2^>nul') do set "BEHIND=%%c"
```

`git rev-list --count HEAD..origin/<分支>` 统计本地比远程少几个提交。结果是 `0` 表示本地已经是最新；大于 `0` 表示远程有更新。

### 询问是否先拉取

```bat
choice /C YN /N /M "Pull remote updates before committing? [Y/n] "
if errorlevel 2 (
    echo [WARN] Skipping pull. Push may fail if remote is ahead.
    goto :commit_local
)
```

`choice` 在窗口中等待用户按 Y 或 N。默认按 Y。按 N 相当于 `errorlevel 2`，脚本会跳过 pull 直接继续提交，但会警告 push 可能失败。

如果传了 `--yes` 或 `-y`，则直接走 `do_pull` 分支，不再询问。

### pull 前保护本地改动

```bat
set "DIRTY=0"
for /f "delims=" %%x in ('git status --porcelain') do (
    set "DIRTY=1"
    goto :after_dirty_check
)
:after_dirty_check
```

`git status --porcelain` 是判断工作区是否干净的可靠方式。没有任何输出表示干净；有输出（任意一行）表示有改动。如果发现本地有改动，脚本会先提交一次，避免 pull 时发生冲突或覆盖。

```bat
git add -A
git commit -m "!MSG!"
```

注意这里使用 `!MSG!` 而不是 `%MSG%`。因为 `if "!DIRTY!"=="1"` 内部是一个命令块，普通 `%MSG%` 会在进入块时就被扩展，而此时 `MSG` 还没有被赋值；延迟扩展 `!MSG!` 会在命令执行时动态读取最新值，保证提交信息正确。

这就是脚本的常规提交动作，只是发生在 pull 之前，用来保护工作。消息仍然是 `docs: 时间戳`。预提交的错误信息会完整显示出来，方便定位问题。

### 拉取远程更新

```bat
git pull origin "%BRANCH%"
```

从远程拉取并合并到当前分支。如果合并发生冲突，命令会失败，脚本提示你手动解决冲突后再次运行。

### 生成提交信息并提交

```bat
for /f "delims=" %%i in ('powershell -NoProfile -Command "Get-Date -Format 'yyyyMMdd HHmm'"') do set "TIMESTAMP=%%i"
set "MSG=docs: %TIMESTAMP%"
```

用 PowerShell 获取稳定的时间格式 `yyyyMMdd HHmm`，避免 `%date%` 和 `%time%` 受系统区域设置影响。

```bat
git add -A
git diff --cached --quiet
if not errorlevel 1 (
    echo [INFO] Nothing to commit. Working tree clean.
    pause
    exit /b 0
)
```

先暂存所有改动，再检查暂存区是否有变化。`git diff --cached --quiet` 返回 0 表示没有改动；返回 1 表示有改动。没有改动时直接退出，避免空提交。

### 推送

```bat
git push origin "%BRANCH%"
```

把当前分支推送到对应的远程分支。这样比在脚本里写死 `git push` 更明确，也避免在特殊分支上误操作。

## 多环境开发建议

1. **每次开始工作前先运行一次脚本并选择 pull**，这样本地始终和远程同步。
2. **不要同时长时间在两台设备上修改同一文件**，否则合并时容易产生冲突。
3. **如果冲突了**，脚本会停止并提示你手动解决。解决后再次运行脚本即可。
4. **可以在计划任务或快捷方式里使用 `auto-commit.bat -y`**，实现无人值守的定时自动同步。

## 常见问题

### Q: 双击运行后窗口一闪就关了？

脚本里已经加了 `pause`。如果闪退，通常是因为脚本在 `pause` 之前就报错退出了——检查 git 是否安装、是否在仓库目录下、当前是否在一个分支上。

### Q: 提示 "Pull failed" 怎么办？

说明拉取时出现了冲突。你需要：

1. 运行 `git status` 查看冲突文件。
2. 手动编辑冲突文件，解决冲突。
3. 运行 `git add -A` 标记已解决。
4. 运行 `git commit` 完成合并。
5. 再次运行 `auto-commit.bat` 推送。

### Q: 不想每次都被询问怎么办？

用 `auto-commit.bat --yes` 或 `auto-commit.bat -y`，脚本会在发现远程更新时自动 pull，不再询问。

### Q: 可以复制到其他项目用吗？

可以。这个脚本不依赖任何项目特定信息，复制到任意 git 仓库根目录即可使用。当前分支名会自动获取，远程默认为 `origin`。

### Q: 提交信息想精确到秒？

把脚本里的 `yyyyMMdd HHmm` 改成 `yyyyMMdd HHmmss` 即可。注意 Windows 和 Linux 版本要分别改对应脚本。
