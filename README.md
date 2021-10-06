# Storefront Backend Project

This project allows the user to use three variables: users, products, orders, with the ability to show, list or create any of the three. 

# To get started

1. Set up the database with the following commands on psql postgres:

- CREATE USER full_stack_user WITH PASSWORD 'password123';
- CREATE DATABASE storefront;
- CREATE DATABASE storefront_test;
- GRANT ALL PRIVILEGES ON DATABASE storefront TO full_stack_user;
- GRANT ALL PRIVILEGES ON DATABASE storefront_test TO full_stack_user;

2. Make sure to add an env file with the following properties:

- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=storefront
- POSTGRES_DB_TEST =storefront_test
- POSTGRES_USER=full_stack_user
- POSTGRES_PASSWORD=password123

- ENV=dev

- BCRYPT_PASSWORD=this-is-the-pepper
- SALT_ROUNDS=10

- TOKEN_SECRET=connor-was-right

# Install dependencies
- npm i

# Script to run and test project functionality

- npm run prettier
- npm run test

# For additional endpoint testing
- POSTMAN on address: localhost:3000//
