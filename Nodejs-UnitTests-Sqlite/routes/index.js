var express = require('express');
var router = express.Router();

const products = require('./products')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<p>HTML Data</p>');
});

/* product routes */
router.use(products)

module.exports = router;
