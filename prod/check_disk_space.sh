#!/bin/bash

# Disk space threshold (10%)
THRESHOLD=10

# Twilio credentials
ACCOUNT_SID=
AUTH_TOKEN=
TWILIO_NUMBER=
TO_NUMBER=

# Get available disk space
AVAILABLE=$(df / | grep / | awk '{ print $4 }')

# Calculate percentage of available space
TOTAL=$(df / | grep / | awk '{ print $2 }')
PERCENTAGE=$((100 * AVAILABLE / TOTAL))

if [ $PERCENTAGE -le $THRESHOLD ]; then
    MESSAGE="Warning: Disk space is below $THRESHOLD%. Available: $PERCENTAGE%."
    curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/Messages.json" \
    --data-urlencode "Body=$MESSAGE" \
    --data-urlencode "From=$TWILIO_NUMBER" \
    --data-urlencode "To=$TO_NUMBER" \
    -u $ACCOUNT_SID:$AUTH_TOKEN
fi
