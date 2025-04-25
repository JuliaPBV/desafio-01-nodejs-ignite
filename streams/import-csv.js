import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath); //lê o arquivos em partes

const csvParse = parse({
  delimiter: ',', //separa os campos
  skipEmptyLines: true, //ignora linha vazia
  fromLine: 2 //pula o cabeçalho
});

async function read() {
  const linesParser = stream.pipe(csvParse);

  for await (const line of linesParser) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title, 
        description,
      })
    })
    }
}

read()

function time(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}