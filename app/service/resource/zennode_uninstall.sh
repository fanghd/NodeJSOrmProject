 #!/bin/bash
PID=$(ps -e|grep todonode|awk '{printf $1}')
if [ $? -eq 0 -a "$PID" != "" ]; then
    kill -9 $PID
    rm -rf /usr/local/app/todo/todonode
    echo "Todo node uninstall success"
else
    echo "Todo node not exit"
    exit
fi