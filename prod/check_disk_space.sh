#!/bin/bash

LOGFILE="/var/filliere-tt/prod/logs/prod.log"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOGFILE
}

log_message "Starting check_disk_space.sh..."

# Disk space threshold (10%)
THRESHOLD=10
SUBJECT="[FILLIÈRE TT] Disk Space Alert"

# Get available disk space
AVAILABLE=$(df / | grep / | awk '{ print $4 }')

# Calculate percentage of available space
TOTAL=$(df / | grep / | awk '{ print $2 }')
PERCENTAGE=$((100 * AVAILABLE / TOTAL))

if [ $PERCENTAGE -le $THRESHOLD ]; then
    MESSAGE="Warning: Disk space is below $THRESHOLD%. Available: $PERCENTAGE%."
    log_message $MESSAGE
    # Send email
    echo -e "From: $MAIL_FROM\nTo: $MAIL_TO\nSubject: $SUBJECT\n\n$MESSAGE" | sendmail -t
else
    log_message "Available: $PERCENTAGE%."
fi
