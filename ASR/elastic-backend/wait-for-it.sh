#!/bin/bash
# Wait for a service to be ready
host=$1
port=$2
timeout=${3:-30}

echo "Waiting for $host:$port to be ready..."

for i in $(seq 1 $timeout); do
  if nc -z $host $port; then
    echo "$host:$port is ready!"
    exit 0
  fi
  sleep 1
done

echo "Timeout waiting for $host:$port"
exit 1
