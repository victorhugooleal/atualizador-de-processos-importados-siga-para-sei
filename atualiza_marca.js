require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const csvFilePath = path.join(__dirname, 'data.csv');
const username = process.env.USERNAMESIGA;
const password = process.env.PASSWORDSIGA;

async function readCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function login(driver) {
  numeroProcessoSiga = 'JFRJ-EOF-2022/00149.01';
  await driver.get(`https://siga.jfrj.jus.br/sigaex/app/expediente/doc/exibir?sigla=${numeroProcessoSiga}`);
  await driver.findElement(By.id('username')).sendKeys(username);
  await driver.findElement(By.id('password')).sendKeys(password);
  await driver.findElement(By.css('button[type="submit"]')).click();
  await driver.wait(until.urlContains('sigaex/app/expediente'), 10000);
}

async function runAutomation(data) {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await login(driver);

    for (const row of data) {
      let numeroProcessoSiga = row.numero_processo_siga;

      try {
        // Executar a automação original
        await driver.get(`https://siga.jfrj.jus.br/sigaex/app/expediente/doc/atualizar_marcas?sigla=${numeroProcessoSiga}`);
        console.log(`Automação executada com sucesso para ${numeroProcessoSiga}`);

        // Executar a automação com tratamento no número do processo SIGA
        if (numeroProcessoSiga.startsWith('JFRJ')) {
          const novoNumeroProcessoSiga = 'RJ' + numeroProcessoSiga.slice(4);
          await driver.get(`https://siga.jfrj.jus.br/sigaex/app/expediente/doc/atualizar_marcas?sigla=${novoNumeroProcessoSiga}`);
          console.log(`Automação executada com sucesso para ${novoNumeroProcessoSiga}`);
        } else if (numeroProcessoSiga.startsWith('TRF2')) {
          const novoNumeroProcessoSiga = 'T2' + numeroProcessoSiga.slice(4);
          await driver.get(`https://siga.jfrj.jus.br/sigaex/app/expediente/doc/atualizar_marcas?sigla=${novoNumeroProcessoSiga}`);
          console.log(`Automação executada com sucesso para ${novoNumeroProcessoSiga}`);
        }
      } catch (error) {
        console.error(`Erro ao processar ${numeroProcessoSiga}:`, error);
      }
    }
  } catch (error) {
    console.error('Erro ao inicializar o driver do Selenium:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

async function main() {
  try {
    const data = await readCSV();
    await runAutomation(data);
  } catch (error) {
    console.error('Erro ao processar o CSV:', error);
  }
}

main().catch(console.error);
