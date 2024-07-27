#!/bin/bash

LOGFILE="/var/filliere-tt/prod/logs/prod.log"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOGFILE
}

log_message "Starting check_services.sh..."

SUBJECT="[FILLIÈRE TT] Service not responding"

# Check if localhost:3000 is responding
if curl --output /dev/null --silent --head --fail http://localhost:3000; then
    log_message "localhost:3000 is up."
else
    log_message "localhost:3000 is not responding, sending email alert." >> $LOGFILE
    echo -e "From: $MAIL_FROM\nTo: $MAIL_TO\nSubject: $SUBJECT\n\nlocalhost:3000 is not responding" | sendmail -t
fi

# Check if localhost:1337 is responding
if curl --output /dev/null --silent --head --fail http://localhost:1337; then
    log_message "localhost:1337 is up."
else
    log_message "localhost:1337 is not responding, sending email alert."
    echo -e "From: $MAIL_FROM\nTo: $MAIL_TO\nSubject: $SUBJECT\n\nlocalhost:1337 is not responding" | sendmail -t
fi
