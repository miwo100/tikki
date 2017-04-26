#!/bin/bash

function checkConnection {
    sleep 2
    #logentry=$(docker logs tikkimysql 2>&1 | grep -E  "socket: '/var/run/mysqld/mysqld.sock'  port: [1-9][0-9]*")
    #logentry=$(docker exec tikkimysql mysql --host=127.0.0.1 -uroot -e "SHOW GLOBAL VARIABLES WHERE variable_name='PORT' and value > 0;" --silent)
    #Access denied message means mysql server is ready for connections
    accessDeniedMsg=$(docker exec tikkimysql mysql --host=127.0.0.1 --silent 2>&1 | grep "Access denied")
    until [ -n "$accessDeniedMsg" ]
    do
    echo "Waiting for database connection..."
    # wait for 1 seconds before check again
    sleep 2
    #logentry=$(docker logs tikkimysql 2>&1 | grep -E  "socket: '/var/run/mysqld/mysqld.sock'  port: [1-9][0-9]*")
    #logentry=$(docker exec tikkimysql mysql --host=127.0.0.1  -uroot -e "SHOW GLOBAL VARIABLES WHERE variable_name='PORT' and value > 0;" --silent)
    accessDeniedMsg=$(docker exec tikkimysql mysql --host=127.0.0.1 --silent 2>&1 | grep "Access denied")
    done
    return 0
}

if [ -z "$(docker ps -aq -f name=tikkimysql)" ] 
then
    #create and run the container by calling docker run, which effectively creates and runs the container
    npm run container && checkConnection && npm run dbmigrate && npm run dbseed
else
    #just start the existing docker container
    echo "running dbmigrate and dbseed now"
    docker start tikkimysql && checkConnection && npm run dbmigrate && npm run dbseed
fi

