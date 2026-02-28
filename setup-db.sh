#!/bin/bash

# Waitlist Database Setup Script for Cloudflare D1

echo "Setting up waitlist database..."

# Create D1 database
echo "Creating D1 database..."
wrangler d1 create built-to-deploy-db

echo ""
echo "Copy the database_id from above and update wrangler.toml"
echo "Replace 'placeholder' in the [[d1_databases]] section"
echo ""
echo "Then run the following command to initialize the schema:"
echo "wrangler d1 execute built-to-deploy-db --file=./schema.sql"
echo ""
echo "For local development:"
echo "wrangler d1 execute built-to-deploy-db --local --file=./schema.sql"
