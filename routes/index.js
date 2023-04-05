var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/:section', (req, res) => {
  res.render(`${req.params.section}`)
});

module.exports = router;
