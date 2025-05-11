const db = require('../db');
class PersonController {
    async createPerson(req, res) {
        const { full_name, login, password, phone, email } = req.body
        const request = await db.query('INSERT INTO person (full_name, login, password, phone, email) values ($1, $2, $3, $4, $5) RETURNING *', [full_name, login, password, phone, email])

        res.json(request.rows[0])
    }
    async getPerson(req, res) {
        const login = req.params.login
        const password = req.params.password
        const request = await db.query('SELECT * FROM person WHERE login = $1 AND password = $2', [login, password])

        res.json(request.rows[0])
    }
    async deletePerson(req, res) {
        const id = req.params.id
        const request = await db.query('DELETE FROM person WHERE id = $1', [id])

        res.json(request.rows[0])
    }
}

module.exports = new PersonController()