import { create } from 'domain'
import http from 'http'

const tasks = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method == 'GET' && url == '/tasks') {
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(tasks))
    }

    if (method == 'POST' && url == '/tasks') {
        tasks.push({
            id: 1,
            title: 'lavar roupa',
            description: 'Lavar roupas brancas',
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        })

        return res.writeHead(201).end()

    }

    return res.writeHead(404).end()
})

server.listen(3333)