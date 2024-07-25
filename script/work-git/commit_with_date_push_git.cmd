@REM 不需要这两行的可以去掉
set http_proxy=http://127.0.0.1:10809
set https_proxy=http://127.0.0.1:10809

cd ../../
@REM 获取当前时间 并 commit

@REM get current time
for /f "delims=" %%a in ('wmic OS Get localdatetime ^| find "."') do set datetime=%%a
set "timestamp=!datetime:~0,4!!datetime:~4,2!!datetime:~6,2!_!datetime:~8,2!!datetime:~10,2!!datetime:~12,2!"

@REM commit
git add .
git commit -m "update at !timestamp!"

@REM 推送
git push origin_gitee
echo "push origin_gitee success"
git push origin_github
echo "push origin_github success"
git push origin_gitlab
echo "push origin_gitlab success"

