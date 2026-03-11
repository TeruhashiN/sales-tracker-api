# Sales Tracker API

A RESTful API built with Node.js and Fastify to manage customers, products, and sales data.  
This project allows recording sales transactions and retrieving monthly sales reports.

---

## Tech Stack

- Node.js
- Fastify
- MySQL
- Insomnia (for API testing)

---

## Project Structure

```
sales-tracker
│
├── src
│   ├── db
│   │   └── connection.js
│   └── server.js
│
├── database
│   ├── schema.sql
│   └── seed.sql
│
├── package.json
├── .gitignore
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/TeruhashiN/sales-tracker-api.git
cd sales-tracker-api
```


### 2. Install dependencies
```
npm install
```


### 3. Setup the database

Start MySQL (XAMPP or other MySQL server).

Create database:

```
sales_tracker
```


Import SQL files:

```
database/schema.sql
database/seed.sql
```

### 4. Configure environment variables
Create a `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=sales_tracker
```

### 5. Run the server
Server should run at: http://localhost:5000

---

## API Endpoints

### Create Customer
POST /customers


Example body:

```json
{
  "name": "Brylle Heraldo",
  "email": "brylleheraldo@gmail.com"
}

POST /products
{
  "name": "Laptop",
  "price": 50000
}

POST /sales
{
  "customer_id": 1,
  "product_id": 1,
  "date": "2026-03-10"
}

Get Sales by Month
GET /sales?month=YYYY-MM

Example:
GET /sales?month=2026-03

Example response:
[
  {
    "customer": "Brylle Heraldo",
    "product": "Laptop",
    "date": "2026-03-10"
  }
]

Testing the API
Insomnia(currently using) or Postman

**Author
Brylle Justin Heraldo**


