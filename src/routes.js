import path from "path";
import { Database } from "./database.js";
import { randomUUID } from "crypto";

const database = new Database()

export const routes = [
    {
        // funcionalidade muda a partir do método enviado.

        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            const tasks = database.select("tasks");

            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const { title, description } = req.body;

    const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    }

    database.insert('tasks', task);

    return res.writeHead(201).end();
    }
        },
        {
            method: 'DELETE',
            path: '/tasks/:id',
            handler: (req, res) => {
                const { id } = req.params;

                database.delete('tasks', id);

                return res.writeHead(204).end();
            }
        }
    
]