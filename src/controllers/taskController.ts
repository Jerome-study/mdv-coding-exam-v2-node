import { Request, Response } from "express"
import connection from "../db/config"
import { v4 as uuidv4 } from 'uuid';

const getSingleTask = (task_id : string, callback : Function) => {
    const getSingleQuery = `SELECT id FROM tasks WHERE id = ?`;

    connection.query(getSingleQuery, [task_id], (err, results : []) => {
        if (err) {
            console.log(err);
            return callback(err, null)
        }

        const task = results.length > 0;
        callback(null, task)
    })
}

// Get Tasks
const getTasks = (req : Request, res : Response) => {
    const getQuery = `SELECT * FROM tasks ORDER BY created_at`
    connection.query(getQuery, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error getting task' });
            return
        }
        res.send(results)
    });
}

// Add Task
const addTask = (req : Request, res : Response) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title cannot be empty' });
    const task_id = uuidv4()
    const addQuery = `INSERT INTO tasks (id, title) values (?, ?)`
    connection.query(addQuery, [task_id, title], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error inserting task' });
            return
        }
        res.status(200).json({ id: task_id, title, status: 0})
    })
}

// Update Task
const updateTask = (req : Request, res : Response) => {
    const { id } = req.params;
    const changeStatusQuery = `UPDATE tasks SET STATUS = NOT status WHERE id = ?`
    modifyTask(res, id, changeStatusQuery, "put")
    
}

// Delete Task
const deleteTask = (req : Request, res : Response) => {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM tasks WHERE id = ?`;
    modifyTask(res, id, deleteQuery, "delete")
}

const modifyTask = (res : Response, id : string, query : string, method : string) => {
    // Check if task exist
    getSingleTask(id, (err : any, task : boolean) => {
        if (err) {
            res.status(500).json({ error: 'Error checking task' });
        }

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // If exist, the query will update or delete depends on the method
        connection.query(query, [id], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating task status' });
            }
            res.status(200).json({ message: method === "put" ? 'Task status successfully changed' : 'Task successfully deleted' });
        })

    })
}

export default {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}