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

6. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes linhas:
    ```dotenv
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DB_NAME=
    ```

7. Coloque o arquivo `data.csv` na raiz do projeto.

8. Execute o projeto:
    ```sh
    node index.js
    ```

9. Você verá a saída do conteúdo do arquivo CSV no console.

