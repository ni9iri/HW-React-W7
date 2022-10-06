const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const config = require("./config"); // its a file so therefore a path

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3001;

// GET method
app.get("/", async (req, res) => {
  try {
    const conn = await mysql.createConnection(config.db);
    const [result] = await conn.execute("select * from task");

    if (!result) result = []; // if there is no data, return empty array.
    res.status(200).json(result);
  } catch (err) {
    // Return status code 500 and error message to the client.
    res.status(500).json({ error: err.message });
  }
});

// POST method
app.post("/new", async function (req, res) {
  try {
    const connection = await mysql.createConnection(config.db);
    // Execute prepared statements
    const [result] = await connection.execute(
      "insert into task (description) values (?)",
      [req.body.description]
    );
    res.status(200).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE methods
app.delete("/delete/:id", async function (req, res) {
  try {
    const connection = await mysql.createConnection(config.db);
    await connection.execute("delete from task where id = ?", [req.params.id]);
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT);
