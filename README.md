# Meu Front

Este projeto visa modernizar o tradicional caderno de receitas, permitindo aos usuários armazenar suas receitas favoritas através de uma API desenvolvida como parte do módulo de Arquitetura de Software da pós-graduação em Engenharia de Software.

---

## Para executar em modo de desenvolvimento

Faça o download do projeto e abra o arquivo index.html no seu browser.

## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório principal da aplicação e execute o seguinte comando para construir a imagem Docker:

```
$ docker build -t minhas-receitas-front .
```

Para executar o container execute o comando:

```
$ docker run -d -p 8080:80 minhas-receitas-front
```

Uma vez executando, para acessar o front-end, basta abrir o [http://localhost:8080/#/](http://localhost:8080/#/) no navegador.

## Minhas Receitas API

A API desse projeto está localizada no repositório [Minhas Receitas API](https://github.com/rainierresende/Minhas-Receitas-API)
