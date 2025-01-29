require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, 'data.csv');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  authPlugins: {
    mysql_native_password: () => () => Buffer.from(process.env.DB_PASSWORD)
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

fs.createReadStream(csvFilePath)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    const numeroProcessoSiga = row.numero_processo_siga;
    const numeroProcessoSei = row.numero_processo_sei;

    // Executar a query original
    let query = `CALL inserir_migracao_sei('${numeroProcessoSiga}', '${numeroProcessoSei}')`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Erro ao executar a procedure:', error);
        return;
      }
      console.log('Procedure executada com sucesso:', results);
    });

    // Executar a query com tratamento no número do processo SIGA
    if (numeroProcessoSiga.startsWith('JFRJ')) {
      const novoNumeroProcessoSiga = 'RJ' + numeroProcessoSiga.slice(4);
      query = `CALL inserir_migracao_sei('${novoNumeroProcessoSiga}', '${numeroProcessoSei}')`;
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Erro ao executar a procedure:', error);
          return;
        }
        console.log('Procedure executada com sucesso com RJ:', results);
      });
    } else if (numeroProcessoSiga.startsWith('TRF2')) {
      const novoNumeroProcessoSiga = 'T2' + numeroProcessoSiga.slice(4);
      query = `CALL inserir_migracao_sei('${novoNumeroProcessoSiga}', '${numeroProcessoSei}')`;
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Erro ao executar a procedure:', error);
          return;
        }
        console.log('Procedure executada com sucesso com T2:', results);
      });
    }
  })
  .on('end', () => {
    console.log('CSV processado com sucesso');
    connection.query('SHOW ERRORS', (error, results) => {
      if (error) {
        console.error('Erro ao mostrar erros:', error);
        return;
      }
      console.log('Erros:', results);
    });
  });
