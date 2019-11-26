#!/bin/bash
if [ ! -d "/usr/local/app/todo/todonode" ]; then
    mkdir -p /usr/local/app/todo
    cd /usr/local/app/todo/
    wget http://${ip}:${port}/todonode.tar.gz
    tar -zxvf todonode.tar.gz
    rm todonode.tar.gz
    cd ./todonode/conf
    sed -i "s/{{machine_ip}}/${machine_ip}/g" `grep 192.168.2.131 -rl ./*`
    cd ../bin
    chmod u+x todonode
    ./todonode --config=../conf/todonode.conf
    if [[ `ps -e | grep todonode` =~ "todonode" ]]; then
        echo 'Todo node installed success'
    else
        echo 'Todo node installed failed'
    fi
else
    echo "Todo node has installed"
fi