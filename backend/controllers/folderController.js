import pool from "../db.js";

export const createFolder = async(req, res) => {
    try {
        const {name, emoji} = req.body;
        const result= await pool.query("INSERT INTO folders(name, emoji) VALUES ($1, $2) RETURNING *",[name, emoji]);
        res.json(result.rows[0]);
    } catch (error) {
         res.status(500).json({ error: err.message });
    }
}

export const getFolders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM folders ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM folders WHERE id = $1", [id]);
    res.json({ message: "Folder deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};