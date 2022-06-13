const express = require("express");
const app = express();
// const cors = require('cors');
const pool = require("./db");

// middleware
// app.use(cors())
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// Routes
// create todo
app.post("/todos", async (req, res) => {
    try {
        const {
            description
        } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            description,
            completed
        } = req.body;
        if (description) {
            const editTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
        } else if (completed) {
            const completeTodo = await pool.query("UPDATE todo SET completed = $1 WHERE todo_id = $2", [completed, id])
        }
        res.json("todo was updated")
    } catch (error) {
        console.error(error.message)
    }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Todo was deleted!")
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})