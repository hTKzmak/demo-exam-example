const Router = require('express')
const router = new Router()
const requestController = require('../controllers/request.controller')

router.post('/request', requestController.createRequest)
router.get('/request/:person_id', requestController.getRequestByPersonId)
router.get('/request', requestController.getAllRequests)
router.put('/request/status', requestController.updateStatus)
router.put('/request/desc', requestController.updateDescription)
router.delete('/request/:id', requestController.deleteRequest)

module.exports = router