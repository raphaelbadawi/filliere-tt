#!/bin/bash

LOGFILE="/var/filliere-tt/prod/logs/prod.log"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOGFILE
}

log_message "Starting docker_cleanup.sh..."

# Check if localhost:3000 is responding
if curl --output /dev/null --silent --head --fail http://localhost:3000; then
    log_message "localhost:3000 is up."
else
    log_message "localhost:3000 is not responding, skipping Docker cleanup."
    exit 1
fi

# Check if localhost:1337 is responding
if curl --output /dev/null --silent --head --fail http://localhost:1337; then
    log_message "localhost:1337 is up."
else
    log_message "localhost:1337 is not responding, skipping Docker cleanup."
    exit 1
fi

# If both checks pass, run Docker cleanup
log_message "Both services are up, running Docker cleanup."
docker system prune -a -f --volumes
