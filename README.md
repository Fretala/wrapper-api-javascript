Freta la - API
===============

Este projeto é uma interface para a nossa API. A documentação da API está detalhada [neste link][apidocs].  
Este wrapper contém apenas as chamadas relacionadas a cartões de crédito, pois recomendamos que os dados do cartão sejam enviados diretamente do browser para a API.

Uso
---

Todos os exemplos aqui citados estão em example.html:

### Instanciar objeto:
É necessário instanciar a nossa classe para fazer qualquer chamada:
```javascript
var fretala = new FretaWrapper('sandbox'); //ou 'production'
```

### Setar token:
Para cada operação, é necessário obter uma token do servidor e setá-la da seguinte maneira:
```javascript
fretala.setToken('qOcIORFJdWs7Qs+KfrjngUSjqTRWIalD1Ai1auoRh2g='); 
```
Para mais detalhes, veja nosso guia de integração.

### Inserir cartão:

```javascript
var cardData = {
  'name': '234',
  'number': '4111111111111111',
  'cvv': '123',
  'expDate': '201812'
};

fretala.insertCard(cardData, function(err, result) {
  if(err) {
    alert(err);
  }
  console.log(result);
});
```

### Deletar cartão:
```javascript
var cardToken = 'car_acc56f792346af0a198da2b43327519eb6ead0f2';
fretala.deleteCard(cardToken, function(err, result) {
  if(err) {
    alert(err);
  }
  console.log(result);
});
```

### Listar cartões:
```javascript
fretala.getCards(function(err, result) {
  if(err) {
    alert(err);
  }
  console.log(result);
});
```
[apidocs]:http://freta.la/apidocs/
