import {pool} from "../db/dbSetup";
const createOrder = (req, res) => {
    const {customer_id, date_get} = req.body;
    pool.query('INSERT INTO orders (customer_id, date_get) VALUES ($1, $2) RETURNING *',
        [customer_id, date_get], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`Order added with ID: ${results.rows[0].id}`)
        })
}

const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM orders WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Order deleted with ID: ${id}`)
    })
}

const getOrders = (req, res) => {
    pool.query('SELECT * FROM orders ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM orders WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updateOrder = (req, res) => {
    const id = parseInt(req.params.id)
    const {customer_id, date_get} = req.body

    pool.query(
        'UPDATE orders SET customer_id = $1, date_get = $2, WHERE id = $3',
        [customer_id, date_get,  id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Order modified with ID: ${id}`)
        }
    )
}

const searchOrder = (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    pool.query(
        'Select * from orders where $1 like $2%', [key, value],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        }
    )
}
module.exports={
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    searchOrder,
}