/* Configuracion de proxys en local*/
/* Para evitar la configuracion de CORS*/

const PROXY_CONFIG = [
  {
    /* url cortas*/
    context: [
      '/api/session',
      '/api/items',
      '/api/movements',
      '/api/purchases',
      '/api/promotions',
      '/api/csrf'
    ],
    /*target para dev*/
    // target: 'https://nginx-cashback-mx-cashback-web-dev.apps.str01.mex.dev.mx1.paas.cloudcenter.corp/',
    target: 'http://localhost:3000/',
    secure: false,
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
