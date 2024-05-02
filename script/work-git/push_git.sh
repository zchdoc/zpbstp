#!/bin/bash
# 不需要这两行的可以去掉
#export https_proxy=http://127.0.0.1:10809
#export http_proxy=http://127.0.0.1:10809
#export all_proxy=socks5://127.0.0.1:10809

cd ../../

git push origin_gitee
echo "push origin_gitee success"
git push origin_github
echo "push origin_github success"
git push origin_gitlab
echo "push origin_gitlab success"

