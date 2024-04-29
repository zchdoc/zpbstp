@REM 不需要这两行的可以去掉
set http_proxy=http://127.0.0.1:10809
set https_proxy=http://127.0.0.1:10809

git pull origin_gitee
echo "pull origin_gitee success"
git pull origin_github
echo "pull origin_github success"
git pull origin_gitlab
echo "pull origin_gitlab success"

