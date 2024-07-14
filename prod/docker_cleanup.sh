#!/bin/bash

# Check if localhost:3000 is responding
if curl --output /dev/null --silent --head --fail http://localhost:3000; then
    echo "localhost:3000 is up."
else
    echo "localhost:3000 is not responding, skipping Docker cleanup."
    exit 1
fi

# Check if localhost:1337 is responding
if curl --output /dev/null --silent --head --fail http://localhost:1337; then
    echo "localhost:1337 is up."
else
    echo "localhost:1337 is not responding, skipping Docker cleanup."
    exit 1
fi

# If both checks pass, run Docker cleanup
echo "Both services are up, running Docker cleanup."
docker system prune -a -f --volumes
