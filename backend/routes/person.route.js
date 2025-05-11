const Router = require('express')
const router = new Router()
const personController = require('../controllers/person.controller')

router.post('/person', personController.createPerson)
router.get('/person/:login/:password', personController.getPerson)
router.delete('/person/:id', personController.deletePerson)

module.exports = router