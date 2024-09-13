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


// Controller untuk menyimpan data ke daily_log berdasarkan nama
exports.createDailyLog = async (req, res) => {
  const { ticketId } = req.body;
  try {
    // Get ticket details
    let ticket = await ticketService.getTicketById(ticketId);
    ticket = ticket[0];

    // Format the date
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = now.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;

    // Get NIK
    const nik = await ticketService.getUserAssign(ticket.assigned);

    // Prepare data for insertion
    const data = [nik, formattedDate, `Penambahan Fitur ${ticket.nama_fitur}`, String(ticket.Deskripsi), String(ticket.Status)];

    // Insert data into daily_log
    const result = await ticketService.insertDailyLog(...data);

    // Send response
    res.status(201).json({
      message: 'Data successfully inserted',
      result: result
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      message: 'Failed to insert data',
      error: err
    });
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
