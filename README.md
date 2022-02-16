# BeGrowth - Teste NodeJS

## Introdução
O projeto visa implementar desafio de código baseado no repositório https://github.com/ciclic/duff.

## Stack
Foi utilizado Javascript rodando no servidor com NodeJS na versão 14.17, juntamente com TypeScript e Express.

Para banco de dados, foi utilizado PostgreSQL na versão 13.4 e TypeORM como ORM para manipular os dados na aplicação.

Ambos estão rodando em containers Dockers.

## Instalação
Primeiramente, deve-se realizar o clone do projeto utilizando GIT. Após isso, deve-se duplicar e renomear o arquivo 
.env.sample para .env, conforme comando abaixo:
```shell
> mv .env.sample .env
```

Após isso, execute o comando para subir os container do Docker:
```shell
> docker-compose up
```
<sup>Obs: Por gosto pessoal, eu prefiro deixar o Docker rodando no terminal, sem usar o parametro -d. Isso facilita o
debug da aplicação.</sup>

<sup>Obs²: Quando o docker subir, ele deve criar o banco de dados automaticamente. Caso isso não aconteça, precisará criar
o banco de dados manualmente. Por padrão, o banco deverá se chamar "begrowth_beer_dev".

Depois que o container do Docker subir, abra outra aba ou outra janela do terminal e execute o seguinte codigo:
```shell
> docker-compose exec web bash
```
Esse comando irá habilitar a execução de comandos diretamente dentro do container. Nesse ponto, iremos executar o 
migration do TypeORM.
Execute o seguinte comando:
```shell
> npm run typeorm migration:run
```

Agora, instale as dependencias do projeto utilizando npm ou yarn.
```shell
> npm install
```
<sup>Caso dê algum erro de biblioteca depreciada, instale utilizando as flags "--force --legacy-peer-deps"</sup>

Após a tabela ser criada, as informações iniciais serem inseridas e as dependências instaladas, o projeto estará pronto
para ser utilizado, rodando na porta 4000.

Na raiz do projeto, existe um arquivo para importação das rotas para testar no Postman. Faça a importação. Já terá alguns
modelos de rotas prontos para ser executados.

## Testes
Para fim de demonstração, foi criado apenas um teste unitário. Basta executar no terminal:
```shell
> npm run test
```

## Possíveis melhorias
Foi feito uma separação bem básica das camadas da aplicação. Seria importante realizar uma análise e planejamento da 
arquitetura ideal para esse projeto, separando as camadas visando o máximo de desacoplamento possível do código, sendo 
possível substituir camadas da aplicação sem grande esforço. Utilizadação de Clean Arch, DDD e Solid poderiam resolver 
esse problema.

Também poderia ter sido criado mais testes para cobrir todo o código. Isso evitaria possíveis problemas futuros de
manutenção e melhoria do código.

Não foi realizada nenhuma autenticação, mas não seria dificil implementá-la. Utitlizar JWT ou OAuth para tal seria importante.

---

Qualquer dúvida, estou a disposição para saná-las.

Muito obrigado!
