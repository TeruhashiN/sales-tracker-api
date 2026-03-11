const fastify = require('fastify')({ logger: true })
const pool = require('./db/connection')

const PORT = process.env.PORT || 5000

fastify.get('/', async () => {
  return { message: 'Sales Tracker running' }
})

fastify.get('/test-db', async (request, reply) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS result')
    return {
      message: 'Database connected successfully',
      data: rows
    }
  } catch (error) {
    reply.status(500)
    return {
      message: 'Database connection failed',
      error: error.message
    }
  }
})

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`Server running on port ${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// Example route to create a new customer
fastify.post('/customers', async (request, reply) => {
  const { name, email } = request.body

  try {
    const [result] = await pool.query(
      'INSERT INTO customers (name, email) VALUES (?, ?)',
      [name, email]
    )

    reply.status(201)
    return {
      message: 'Customer created successfully',
      customerId: result.insertId
    }
  } catch (error) {
    reply.status(500)
    return {
      message: 'Failed to create customer',
      error: error.message
    }
  }
})

// Example route to create a new product
fastify.post('/products', async (request, reply) => {
  const { name, price } = request.body

  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, price) VALUES (?, ?)',
      [name, price]
    )

    reply.status(201)
    return {
      message: 'Product created successfully',
      productId: result.insertId
    }
  } catch (error) {
    reply.status(500)
    return {
      message: 'Failed to create product',
      error: error.message
    }
  }
})

// Example route to create a new sale
fastify.post('/sales', async (request, reply) => {
  const { customer_id, product_id, date } = request.body

  try {
    const [result] = await pool.query(
      'INSERT INTO sales (customer_id, product_id, date) VALUES (?, ?, ?)',
      [customer_id, product_id, date]
    )

    reply.status(201)
    return {
      message: 'Sale created successfully',
      saleId: result.insertId
    }
  } catch (error) {
    reply.status(500)
    return {
      message: 'Failed to create sale',
      error: error.message
    }
  }
})

// Get sales for a specific month
fastify.get('/sales', async (request, reply) => {
  const { month } = request.query

  if (!month) {
    reply.status(400)
    return {
      message: 'Month query is required. Example: /sales?month=2026-03'
    }
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT
        customers.name AS customer,
        products.name AS product,
        sales.date
      FROM sales
      JOIN customers ON sales.customer_id = customers.id
      JOIN products ON sales.product_id = products.id
      WHERE DATE_FORMAT(sales.date, '%Y-%m') = ?
      ORDER BY sales.date ASC
      `,
      [month]
    )

    return {
      message: 'Sales retrieved successfully',
      data: rows
    }
  } catch (error) {
    reply.status(500)
    return {
      message: 'Failed to fetch sales',
      error: error.message
    }
  }
})

start()