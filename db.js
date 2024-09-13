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

// Fungsi untuk mendapatkan NIK berdasarkan nama
exports.getUserAssign = (nama) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT NIK FROM user_it WHERE Nama LIKE ?'; 
    const searchValue = `%${nama}%`; 
    connection.query(query, [searchValue], (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length > 0) {
        resolve(results[0].NIK); // Mendapatkan NIK dari hasil query
      } else {
        reject('User not found :'+nama);
      }
    });
  });
};

// Fungsi untuk menambahkan data ke dalam daily_log
exports.insertDailyLog = (NIK, tanggal, judul_act, deskripsi_act, catatan) => {
  return new Promise((resolve, reject) => {
    const now = new Date();

    // Memastikan elemen tanggal memiliki dua digit menggunakan padStart
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi +1
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Menggabungkan elemen tanggal menjadi format dmYhis
    const formattedDate = `${day}${month}${year}${hours}${minutes}${seconds}`;
    const id = `${NIK}_${formattedDate}`;

    const query = `
      INSERT INTO daily_log (id, NIK, tanggal, judul_act, deskripsi_act, catatan) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [id, NIK, tanggal, judul_act, deskripsi_act, catatan];

    connection.query(query, values, (err, results) => {
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
