const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// eslint-disable-next-line import/no-extraneous-dependencies
const { http, https } = require('follow-redirects');

const app = express();
app.use(express.json());

app.use('/api', createProxyMiddleware({
  target: 'https://vapi.vnappmob.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  selfHandleResponse: true,
  onProxyRes(proxyRes, req, res) {
    if (proxyRes.headers.location) {
      const {location} = proxyRes.headers;
      const protocol = location.startsWith('https') ? https : http;

      protocol.get(location, redirectRes => {
        redirectRes.pipe(res);
      });
    } else {
      // Forward headers and body as usual
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      proxyRes.pipe(res);
    }
  },
}));

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});
