const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/monthly-expenditure',
    createProxyMiddleware({
      target: 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook',
      changeOrigin: true,
      pathRewrite: {
        '^/api/monthly-expenditure': '',
      },
    })
  );
}; 