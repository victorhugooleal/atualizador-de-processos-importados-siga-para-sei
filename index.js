const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, 'data.csv');

const csvData = [];

fs.createReadStream(csvFilePath)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    console.log(`Número Processo SEI: ${row.numero_processo_sei}, Número Processo SIGA: ${row.numero_processo_siga}`);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

console.log('Hello, Node.js project!');
