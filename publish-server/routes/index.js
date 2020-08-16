var express = require('express');

var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req);
  fs.writeFileSync("../server/public/1.html", "string");
  // res.render('index', { title: 'Express' });
});

module.exports = router;
