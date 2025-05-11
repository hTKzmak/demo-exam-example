const db = require('../db');
class RequestController {
    async createRequest(req, res) {
        const { address, contacts, request_type, payment_type, date, time, status, description, person_id } = req.body
        const request = await db.query('INSERT INTO request (address, contacts, request_type, payment_type, date, time, status, description, person_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [address, contacts, request_type, payment_type, date, time, status, description, person_id])

        res.json(request.rows[0])
    }
    async getRequestByPersonId(req, res) {
        const person_id = req.params.person_id
        const request = await db.query('SELECT * FROM request WHERE person_id = $1', [person_id])
        
        res.json(request.rows[0])
    }
    async getAllRequests(req, res) {
        const request = await db.query('SELECT * FROM request')

        res.json(request.rows)
    }
    async updateStatus(req, res) {
        const { status, id } = req.body
        const request = await db.query('UPDATE request SET status = $1 WHERE id = $2', [status, id])

        res.json(request.rows)
    }
    async updateDescription(req, res) {
        const { description, id } = req.body
        const request = await db.query('UPDATE request SET description = $1 WHERE id = $2', [description, id])

        res.json(request.rows)
    }
    async deleteRequest(req, res) {
        const id = req.params.id
        const request = await db.query('DELETE FROM request WHERE id = $1', [id])

        res.json(request.rows[0])
    }
}

module.exports = new RequestController()