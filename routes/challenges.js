var express = require('express');
var router = express.Router();
var scores = require('../scores').scores;

// GET /challenges/xss1
router.get('/xss1', function(req, res) {
  var showWarn = false;
  var payload;
  if(req.query.payload && req.query.payload.length > 0){
    payload = filterXSS1(req.query.payload);
  } else {
    showWarn = true;
  }
  res.setHeader('X-XSS-Protection', '0');
  res.render('challenges/xss1', { 'title': 'XSS 1 - (Easiest)', 'payload': payload, 'showWarn': showWarn, 'scores': scores.xss1 });
});


// GET /challenges/xss2
router.get('/xss2', function(req, res) {
  var showWarn = false;
  var payload;
  if(req.query.payload && req.query.payload.length > 0){
    payload = filterXSS2(req.query.payload);
  } else {
    showWarn = true;
  }
  res.setHeader('X-XSS-Protection', '0');
  res.render('challenges/xss2', { 'title': 'XSS 2 - (Easy)', 'payload': payload, 'showWarn': showWarn, 'scores': scores.xss2 });
});



router.get(/.*/, function(req, res) {
  res.render('challenges/todo', { title: 'To be Done' });
});

// Filters < , > & ". Also, alert-> $
function filterXSS1(payload){
  payload = payload.replace(/"/gi, '');
  payload = payload.replace(/</gi, '');
  payload = payload.replace(/>/gi, '');
  payload = payload.replace(/alert/gi, '$');

return payload;
}



// Filters < , > , ', (,) Also, alert,eval,prompt
function filterXSS2(payload){
  payload = payload.replace(/'/gi, '');
  payload = payload.replace(/</gi, '');
  payload = payload.replace(/>/gi, '');
  payload = payload.replace(/\(/gi, '');
  payload = payload.replace(/\)/gi, '');
  payload = payload.replace(/alert/gi, '$');
  payload = payload.replace(/prompt/gi, '$');
  payload = payload.replace(/eval/gi, '$');
  payload = payload.replace(/window/gi, '$');
  payload = payload.replace(/document/gi, '$');
  payload = payload.replace(/location/gi, '$');
  payload = payload.replace(/throw/gi, '$');

return payload;
}


module.exports = router;
