import {pool} from "../db/dbSetup";

const createCustomer = (req, res) => {
    const {first_name, last_name, phone_number, address} = req.body;
    pool.query('INSERT INTO customers (first_name, last_name, phone_number, address) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, phone_number, address], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`Customer added with ID: ${results.rows[0].id}`)
        })
}

const deleteCustomer = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM customers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Customer deleted with ID: ${id}`)
    })
}

const getCustomers = (req, res) => {
    pool.query('SELECT * FROM customers ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updateCustomer = (req, res) => {
    const id = parseInt(req.params.id)
    const {first_name, last_name, phone_number, address} = req.body

    pool.query(
        'UPDATE customers SET first_name=$1, last_name=$2, phone_number=$3, address=$4, WHERE id = $5',
        [first_name, last_name, phone_number, address, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Customer modified with ID: ${id}`)
        }
    )
}

const searchCustomer = (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    pool.query(
        'Select * from customers where $1 like $2%', [key, value],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        }
    )
}
module.exports = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomer,
}