#!/bin/bash
file1=./frontend/.env.example.js
file2=./frontend/.env.prod.example.js
file3=./backend/.env.example
if [ -e "$file1" ] && [ -e "$file2" ] && [ -e "$file3" ]; then
    echo "All example env files exists"
else
    echo "Example env file does not exist. Make sure you copied them not renamed them"
    exit 1
fi
