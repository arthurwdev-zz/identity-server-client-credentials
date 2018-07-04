const {
  Issuer
} = require('openid-client');

// Aumenta o timeout. O valor padrão é baixo e gera falha, dependendo da rede.
Issuer.defaultHttpOptions = {
  timeout: 3000
};

// Descoberta automática dos dados do Identity Server baseado na URL
Issuer.discover('https://servidor-identity.azurewebsites.net')
  .then(function (googleIssuer) {
    console.log('Discovered issuer %s', googleIssuer);

    // Instancia o Client (informar client id e a chave) 
    const client = new googleIssuer.Client({
      client_id: 'client-id',
      client_secret: 'cliente-secret'
    });

    // Gera o token baseado no escopo (informar o scope)
    client.grant({
      grant_type: 'client_credentials',
      scope: 'api-scope'
    }).then(function (data) {
      console.log('Token %s', data.access_token);
      });
    
  }).catch(function (err) {
    console.log('Error %s', err);
  });