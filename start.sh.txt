#!/bin/bash

# Start backend
cd backend
gunicorn app:app --bind 0.0.0.0:5000 &

# Start frontend
cd ..
npm install
npm run build
npm start