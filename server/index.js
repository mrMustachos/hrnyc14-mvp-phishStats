const express = require('express');
const bodyParser = require('body-parser');
const netControllers = require('../controllers/netControllers.js');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', netControllers.getPLACEHOLDER);
app.post('/items', netControllers.postPLACEHOLDER);

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

