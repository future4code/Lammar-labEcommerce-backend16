![LabECommerce (1)](https://user-images.githubusercontent.com/102442943/205577380-2d47759e-6996-4877-ab49-3be50418c35c.png)

# <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f6cd-fe0f.svg" width="40px"> API - LabEcommerce-Backend
<p> Obter informações de usuários cadastrados, cadastrar novos usuários, cadastrar novos produtos, obter informações de compras de usuários, etc. </p>

#

### Documentação:  [documentação labeEcommerce ](https://documenter.getpostman.com/view/22530775/2s8YzMYQuz)
### Deploy:  [deploy labeEcommerce](https://labecommerce-backend-12ib.onrender.com) 

#

### Endpoints: 

:white_check_mark: [GET Get all users](#getAllUsers)
<br/>
:white_check_mark: [GET Get all products](#getAllProducts)
<br/>
:white_check_mark: [GET Get user purchases](#getUserPurchases)
<br/>
:white_check_mark: [POST Register user](#registerUser)
<br/>
:white_check_mark: [POST Register product](#registerProduct)
<br/>
:white_check_mark: [POST Register purchase](#registerPurchase)

#

### <a name=getAllUsers><a/> GET Get all users:
<p>Endpoint que retorna todos os usuários cadastrados no banco de dados. </p>

![getAllUsers](https://user-images.githubusercontent.com/102442943/205583613-6a921644-6018-466c-9ad3-1ea74b27276a.png)

#

### <a name=getAllProducts><a/> GET Get all products:
<p>Endpoint que retorna todos os produtos cadastrados no banco de dados. </p>

![getAllProducts(sem_parametros)](https://user-images.githubusercontent.com/102442943/205584178-946dbdd3-c245-4444-badd-bcf86ff47da0.png)

<p>Pode receber dois parâmetros por query params: order e search. </p>

- Order: recebe ASC ou DESC e retornar todos os produtos em ordem alfabética de forma crescente ou decrescente, respectivamente.
- search: recebe uma string e retorna todos os produtos que contenha a mesma em seu nome.

![getAllProducts(+order+serach)](https://user-images.githubusercontent.com/102442943/205584539-d794c8ee-3467-4c88-b38f-bdd42bed00eb.png)

#

### <a name=getUserPurchases><a/> GET Get user purchases:
<p>Endpoint que retorna todas as compras feitas por um determinado usuário, através de seu id. </p>

- Recebe o id via path params.

![getUserPurchases](https://user-images.githubusercontent.com/102442943/205585445-11537a83-2ed4-4a25-8dbf-8dbeb6af2478.png)

#

### <a name=registerUser><a/> POST Register user:
<p>Endpoint que cadastra novos usuários no banco de dados. </p>

- Recebe name, email e password do usuário, através do body.

![registerUser](https://user-images.githubusercontent.com/102442943/205586244-2840fd54-fbcb-4fe6-ac4b-d4dc347250e1.png)

#

### <a name=registerProduct><a/> POST Register product:
<p>Endpoint que cadastra novos produtos no banco de dados. </p>

- Recebe name, price e image_url do produto, através do body.

![registerProduct](https://user-images.githubusercontent.com/102442943/205587018-06d1a444-eb00-4855-beaa-61ed0e7b9991.png)

#

### <a name=registerPurchase><a/> POST Register purchaset:
<p>Endpoint que cadastra novas compras no banco de dados. </p>

<p>Recebe user_id, product_id e quantity da compra, através do body. </p>

- user_id: id do usuário que realizará a compra;
- product_id: id do produto a ser comprado;
- quantity: quantidade de unidades do produto à serem compradas.

![registerPurchase](https://user-images.githubusercontent.com/102442943/205587639-3d116f83-d467-467b-be14-3edf63b03c37.png)

#

### Ferramentas e Tecnologias Utilizadas:

- Node.js
- TypeScript
- Knex
- Express
- Mysql
