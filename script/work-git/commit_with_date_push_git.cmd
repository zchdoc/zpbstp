@REM 不需要这两行的可以去掉
set http_proxy=http://127.0.0.1:10809
set https_proxy=http://127.0.0.1:10809

cd ../../

@REM commit
git add .
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set datetime=%datetime:~2,10%
git commit -m "at: %datetime%"

@REM 推送
git push origin_gitee
echo "push origin_gitee success"
git push origin_github
echo "push origin_github success"
git push origin_gitlab
echo "push origin_gitlab success"

