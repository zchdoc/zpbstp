#!/bin/bash
# 不需要这两行的可以去掉
#export https_proxy=http://127.0.0.1:10809
#export http_proxy=http://127.0.0.1:10809
#export all_proxy=socks5://127.0.0.1:10809

cd ../../

git pull origin_gitee Dev22-0617-DeployServer
echo "pull origin_gitee success"
git pull origin_github  Dev22-0617-DeployServer
echo "pull origin_github success"
git pull origin_gitlab  Dev22-0617-DeployServer
echo "pull origin_gitlab success"

