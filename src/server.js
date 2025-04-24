import http from "http";

const tasks = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // funcionalidade muda a partir do método enviado.
  if (method == "GET" && url == "/tasks") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(tasks));
  }

  if (method == "POST" && url == "/tasks") {
    const { title, description } = req.body;

    // o ponto de esclamação serve para inverter a lógica
    if (!title) {
      return res.writeHead(400).end("O campo title é obrigatório");
    }

    if (!description) {
      return res.writeHead(400).end("O campo description é obrigatório");
    }

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    tasks.push(task);

    return res.writeHead(201).end();
  }

  {
    if (method == "PUT" && url == "/tasks/:id") {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res.writeHead(400).end("O campo title é obrigatório");
      }

      const [task] = tasks.filter((task) => task.id === id);
      if (!task) {
        return res.writeHead(404).end();
      }
      update("tasks", id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date(),
      });
      return res.writeHead(204).end();
    }
  }
  { 
    if (method == "DELETE" && url == "/tasks/:id") {
    const { id } = req.params;

    const [task] = tasks.filter((task) => task.id === id);
    if (task === -1) {
      return res.writeHead(404).end();
    }
    tasks.splice(task, 1)

    return res.writeHead(204).end()

  }
}

  return res.writeHead(404).end();
});

server.listen(3333);
