#!/bin/sh

cd /Users/rain/Documents/rain/node/blog-learn/blog1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
