require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const csvFilePath = path.join(__dirname, 'data.csv');
//const urlDefault = 'https://bi.jfes.jus.br/api/public/dashboard/be1387d7-2cd2-41ec-b94a-0be4a9e3e0f0/dashcard/235/card/294?parameters=%5B%7B%22type%22%3A%22string%2F%3D%22%2C%22value%22%3A%5B%22SJRJ%22%2C%22TRF2%22%5D%2C%22id%22%3A%226ccde266%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23627%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2Fcontains%22%2C%22value%22%3Anull%2C%22id%22%3A%222ed7a42b%22%2C%22options%22%3A%7B%22case-sensitive%22%3Afalse%7D%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23626%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2F%3D%22%2C%22value%22%3Anull%2C%22id%22%3A%225bddbaef%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23632%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22date%2Fall-options%22%2C%22value%22%3A%22past4days%22%2C%22id%22%3A%221a4a3738%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23624%2C%7B%22base-type%22%3A%22type%2FDateTime%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2Fcontains%22%2C%22value%22%3Anull%2C%22id%22%3A%22bf17e62c%22%2C%22options%22%3A%7B%22case-sensitive%22%3Afalse%7D%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23631%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2Fcontains%22%2C%22value%22%3Anull%2C%22id%22%3A%227d15a3d8%22%2C%22options%22%3A%7B%22case-sensitive%22%3Afalse%7D%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23629%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%5D'
const urlDefault = 'https://bi.jfes.jus.br/api/public/dashboard/be1387d7-2cd2-41ec-b94a-0be4a9e3e0f0/dashcard/235/card/294?parameters=%5B%7B%22type%22%3A%22string%2F%3D%22%2C%22value%22%3A%5B%22SJRJ%22%2C%22TRF2%22%5D%2C%22id%22%3A%226ccde266%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23627%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2Fcontains%22%2C%22value%22%3Anull%2C%22id%22%3A%222ed7a42b%22%2C%22options%22%3A%7B%22case-sensitive%22%3Afalse%7D%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23626%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2F%3D%22%2C%22value%22%3Anull%2C%22id%22%3A%225bddbaef%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23632%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22date%2Fall-options%22%2C%22value%22%3A%22past1days%22%2C%22id%22%3A%221a4a3738%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23624%2C%7B%22base-type%22%3A%22type%2FDateTime%22%7D%5D%5D%7D%5D';
const urlMonday = 'https://bi.jfes.jus.br/api/public/dashboard/be1387d7-2cd2-41ec-b94a-0be4a9e3e0f0/dashcard/235/card/294?parameters=%5B%7B%22type%22%3A%22string%2F%3D%22%2C%22value%22%3A%5B%22SJRJ%22%5D%2C%22id%22%3A%226ccde266%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23627%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2Fcontains%22%2C%22value%22%3Anull%2C%22id%22%3A%222ed7a42b%22%2C%22options%22%3A%7B%22case-sensitive%22%3Afalse%7D%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23626%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22string%2F%3D%22%2C%22value%22%3Anull%2C%22id%22%3A%225bddbaef%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23632%2C%7B%22base-type%22%3A%22type%2FText%22%7D%5D%5D%7D%2C%7B%22type%22%3A%22date%2Fall-options%22%2C%22value%22%3A%22past3days%22%2C%22id%22%3A%221a4a3738%22%2C%22target%22%3A%5B%22dimension%22%2C%5B%22field%22%2C23624%2C%7B%22base-type%22%3A%22type%2FDateTime%22%7D%5D%5D%7D%5D';

const today = new Date();
const url = today.getDay() === 1 ? urlMonday : urlDefault;
console.log(today.getDay());

async function fetchData() {
  try {
    const response = await axios.get(url);
    console.log('Response data:', response.data); // Log the response data
    if (response.data && response.data.data && response.data.data.rows) {
      return response.data.data.rows;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
}

function formatCodigoSiga(codigoSiga) {
  const regex = /^(TRF2|JFRJ|T2)([A-Z]{3})(\d{4})(\d{5})(\.\d{2})?$/;
  const match = codigoSiga.match(regex);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}/${match[4]}${match[5] || ''}`;
  }
  return codigoSiga;
}

async function writeCSV(data) {
  const csvData = data.map(row => {
    const codigoSiga = formatCodigoSiga(row[0]);
    return `${codigoSiga};${row[1]}`;
  }).join('\n');
  const header = 'numero_processo_siga;numero_processo_sei\n';
  fs.writeFileSync(csvFilePath, header + csvData, 'utf8');
  console.log('Arquivo CSV atualizado com sucesso');
}

async function main() {
  try {
    const data = await fetchData();
    await writeCSV(data);
  } catch (error) {
    console.error('Erro ao processar os dados:', error);
  }
}

main();
