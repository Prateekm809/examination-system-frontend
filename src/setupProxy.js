const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://examination-system-backend-production.up.railway.app",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying ${req.method} request to: ${proxyReq.href}`);
      },
      onError: (err, req, res) => {
        console.error(`Proxy error: ${err.message}`);
        res.status(500).send('Proxy error');
      }
    })
  );
};
