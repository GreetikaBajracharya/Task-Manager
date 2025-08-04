import pool from "../db.js";

export const createGroup = async (req, res) => {
  try {
    const { name, folder_id } = req.body;
    const result = await pool.query(
      "INSERT INTO groups (name, folder_id) VALUES ($1, $2) RETURNING *",
      [name, folder_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroupsByFolder = async (req, res) => {
  try {
    const { folder_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM groups WHERE folder_id = $1 ORDER BY id ASC",
      [folder_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM groups WHERE id = $1", [id]);
    res.json({ message: "Group deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
