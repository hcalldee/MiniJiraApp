const ticketService = require('./db');

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single ticket by id
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (ticket.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
  const { id_ticket, nama_fitur, unit, assigner, assigned, Deskripsi, start, end, Priority, Resource, Status } = req.body;
  const newTicket = { id_ticket, nama_fitur, unit, assigner, assigned, Deskripsi, start, end, Priority, Resource, Status };
  
  try {
    await ticketService.createTicket(newTicket);
    res.json({ message: 'Ticket created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a ticket by id
exports.updateTicket = async (req, res) => {
  const { nama_fitur, unit, assigner, assigned, Deskripsi, start, end, Priority, Resource, Status } = req.body;
  const updatedTicket = { nama_fitur, unit, assigner, assigned, Deskripsi, start, end, Priority, Resource, Status };
  
  try {
    await ticketService.updateTicket(req.params.id, updatedTicket);
    res.json({ message: 'Ticket updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a ticket by id
exports.deleteTicket = async (req, res) => {
  try {
    await ticketService.deleteTicket(req.params.id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
