const express = require('express');
const router = express.Router();
const controller = require('./controller');

// CRUD routes
router.get('/tickets', controller.getAllTickets);
router.get('/tickets/:id', controller.getTicketById);
router.post('/tickets', controller.createTicket);
router.put('/tickets/:id', controller.updateTicket);
router.delete('/tickets/:id', controller.deleteTicket);

module.exports = router;
