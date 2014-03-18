var express = require('express'),
    path = require('path'),
    cr = require('./routes/cr');

var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '../client')));

// app.get('/cr/:id/reports', employees.findByManager);
app.get('/cr/:id', cr.findById);
// app.get('/employees', employees.findAll);

app.listen(3000);
console.log('Listening on port 3000...');
