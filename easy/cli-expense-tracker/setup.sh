#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Linking the CLI tool..."
npm link

echo "Setup complete! You can now run 'expense-tracker' from the command line."