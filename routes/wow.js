const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('get wow');
});

router.post('/', (req, res) => {
  res.send('post wow');
});

router.get('/:person', (req, res) => {
  res.send(req.params.person);
})

router.post('/:person', (req, res) => {
  res.send(req.body);
});

module.exports = router;