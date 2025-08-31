import pool from "../db.js";

export const inputTask = async (req, res) => {
  try {
    const { t_name, group_id } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasks (t_name, group_id) VALUES ($1, $2) RETURNING *",
      [t_name, group_id]
    );
    res.json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getTasksByGroup = async (req, res) => {
  try {
    const { group_id } = req.params;
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE group_id = $1 ORDER BY id ASC",
      [group_id]
    );
    res.json(tasks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getATask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { t_name, completed } = req.body;

    const updateTask = await pool.query(
      "UPDATE tasks SET t_name = $1, completed = $2 WHERE id = $3 RETURNING *",
      [t_name, completed, id]
    );
    res.json(updateTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
