const pool = require('../config/db');

function mapPerson(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone
  };
}

exports.getAllPeople = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, first_name, last_name, email, phone FROM people ORDER BY id ASC'
    );
    res.json(rows.map(mapPerson));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch people.', error: error.message });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await pool.query(
      'SELECT id, first_name, last_name, email, phone FROM people WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Person not found.' });
    }

    res.json(mapPerson(rows[0]));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch person.', error: error.message });
  }
};

exports.createPerson = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO people (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, phone]
    );

    res.status(201).json({
      id: result.insertId,
      firstName,
      lastName,
      email,
      phone
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create person.', error: error.message });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { firstName, lastName, email, phone } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const [result] = await pool.query(
      'UPDATE people SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?',
      [firstName, lastName, email, phone, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Person not found.' });
    }

    res.json({ id, firstName, lastName, email, phone });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update person.', error: error.message });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query('DELETE FROM people WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Person not found.' });
    }

    res.json({ message: 'Person deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete person.', error: error.message });
  }
};
