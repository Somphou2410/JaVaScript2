// product.route.js
module.exports = app => {
  const product = require("../controllers/product.controller");
  var router = require("express").Router();

  router.get("/", product.findAll); // GET /api/products/

  app.use("/api/products", router);
};
