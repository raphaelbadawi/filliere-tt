#!/bin/bash

LOGFILE="/var/filliere-tt/prod/logs/prod.log"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOGFILE
}

log_message "Starting check_services.sh..."

# Twilio credentials
ACCOUNT_SID=
AUTH_TOKEN=
TWILIO_NUMBER=
TO_NUMBER=

# Function to send SMS
send_sms() {
    local message=$1
    curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/Messages.json" \
    --data-urlencode "Body=$message" \
    --data-urlencode "From=$TWILIO_NUMBER" \
    --data-urlencode "To=$TO_NUMBER" \
    -u $ACCOUNT_SID:$AUTH_TOKEN
}

# Check if localhost:3000 is responding
if curl --output /dev/null --silent --head --fail http://localhost:3000; then
    log_message "localhost:3000 is up."
else
    log_message "localhost:3000 is not responding, sending SMS alert." >> $LOGFILE
    send_sms "Warning: localhost:3000 is not responding."
fi

# Check if localhost:1337 is responding
if curl --output /dev/null --silent --head --fail http://localhost:1337; then
    log_message "localhost:1337 is up."
else
    log_message "localhost:1337 is not responding, sending SMS alert."
    send_sms "Warning: localhost:1337 is not responding."
fi
