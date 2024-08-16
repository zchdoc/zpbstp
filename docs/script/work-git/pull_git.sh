#!/bin/bash
# comment out the following code if you don't need it
export https_proxy=http://127.0.0.1:10809 http_proxy=http://127.0.0.1:10809 all_proxy=socks5://127.0.0.1:10809
cd ../../
# comment out the code below if you do not need it
git pull origin_gitee Dev22-0617-DeployServer
echo "pull origin_gitee success"
git pull origin_github  Dev22-0617-DeployServer
echo "pull origin_github success"
git pull origin_gitlab  Dev22-0617-DeployServer
echo "pull origin_gitlab success"

