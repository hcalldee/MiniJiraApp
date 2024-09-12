const mysql = require('mysql');
const { dbConfig } = require('./config');

// Membuat koneksi ke database menggunakan konfigurasi dari config.js
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Fungsi untuk mendapatkan semua tiket
exports.getAllTickets = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Development_Ticket';
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Fungsi untuk mendapatkan tiket berdasarkan ID
exports.getTicketById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Development_Ticket WHERE id_ticket = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Fungsi untuk membuat tiket baru
exports.createTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Development_Ticket (id_ticket, nama_fitur, unit, assigner, assigned, Deskripsi, start, end, Priority, Resource, Status) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
    connection.query(query, [
      ticket.id_ticket, ticket.nama_fitur, ticket.unit, ticket.assigner, 
      ticket.assigned, ticket.Deskripsi, ticket.start, ticket.end, 
      ticket.Priority, ticket.Resource, ticket.Status
    ], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Fungsi untuk mengupdate tiket berdasarkan ID
exports.updateTicket = (id, ticket) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Development_Ticket SET nama_fitur = ?, unit = ?, assigner = ?, assigned = ?, Deskripsi = ?, start = ?, end = ?, Priority = ?, Resource = ?, Status = ? 
                   WHERE id_ticket = ?`;
    connection.query(query, [
      ticket.nama_fitur, ticket.unit, ticket.assigner, ticket.assigned, 
      ticket.Deskripsi, ticket.start, ticket.end, ticket.Priority, 
      ticket.Resource,ticket.Status, id
    ], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Fungsi untuk menghapus tiket berdasarkan ID
exports.deleteTicket = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Development_Ticket WHERE id_ticket = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
