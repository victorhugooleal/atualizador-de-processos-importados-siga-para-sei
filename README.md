# Atualizador de Processos Importados SIGA para SEI
Esse projeto é um script que faz a a atualização de processos no siga que foram importados para o SEI

## Como rodar o projeto

1. Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Navegue até o diretório do projeto:
    ```sh
    cd /c:/desenvolvimento/atualizador-de-processos-importados-siga-para-sei
    ```

3. Instale as dependências do projeto:
    ```sh
    npm install
    ```

4. Instale o módulo `csv-parser`:
    ```sh
    npm install csv-parser
    ```

5. Coloque o arquivo `data.csv` na raiz do projeto.

6. Execute o projeto:
    ```sh
    node index.js
    ```

7. Você verá a saída do conteúdo do arquivo CSV no console.

## Como rodar o projeto com debug

1. Certifique-se de ter o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Navegue até o diretório do projeto:
    ```sh
    cd /c:/desenvolvimento/atualizador-de-processos-importados-siga-para-sei
    ```

3. Instale as dependências do projeto:
    ```sh
    npm install
    ```

4. Instale o módulo `csv-parser`:
    ```sh
    npm install csv-parser
    ```

5. Coloque o arquivo `data.csv` na raiz do projeto.

6. Execute o projeto em modo debug:
    ```sh
    node --inspect-brk index.js
    ```

7. Abra o Chrome e navegue até `chrome://inspect`. Clique em "Inspect" para iniciar a sessão de debug.

8. Você verá a saída do conteúdo do arquivo CSV no console e poderá depurar o código.
