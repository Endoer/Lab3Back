import {pool} from "../db/dbSetup";
const createCourier = (req, res) => {
    const {first_name, last_name, phone_number, delivery_type} = req.body;
    pool.query('INSERT INTO couriers (first_name, last_name, phone_number, delivery_type) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, phone_number, delivery_type], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`Courier added with ID: ${results.rows[0].id}`)
        })
}

const deleteCourier = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM couriers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Courier deleted with ID: ${id}`)
    })
}

const getCouriers = (req, res) => {
    pool.query('SELECT * FROM couriers ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getCourierById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM couriers WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updateCourier = (req, res) => {
    const id = parseInt(req.params.id)
    const {first_name, last_name, phone_number, delivery_type} = req.body

    pool.query(
        'UPDATE couriers SET first_name=$1, last_name=$2, phone_number=$3, delivery_type=$4, WHERE id = $5',
        [first_name, last_name, phone_number, delivery_type, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Courier modified with ID: ${id}`)
        }
    )
}

const searchCourier = (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    pool.query(
        'Select * from couriers where $1 like $2%', [key, value],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        }
    )
}
module.exports = {
    getCouriers,
    getCourierById,
    createCourier,
    updateCourier,
    deleteCourier,
    searchCourier,
}