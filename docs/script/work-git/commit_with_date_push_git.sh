@REM 不需要这两行的可以去掉
export https_proxy=http://127.0.0.1:10809 http_proxy=http://127.0.0.1:10809 all_proxy=socks5://127.0.0.1:10809
cd ../../

@REM commit
git add .
git commit -m "at: $(date '+%y%m%d%H%M')"

@REM 推送
git push origin_gitee
echo "push origin_gitee success"
git push origin_github
echo "push origin_github success"
git push origin_gitlab
echo "push origin_gitlab success"

