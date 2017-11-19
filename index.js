var express = require('express');
var app = express();

var pg = require("pg"); // This is the postgres database connection module.
const { Client } = require('pg');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app.get('/getPerson/:id', function(request, response) {
    client.connect()
    
    client.query('SELECT * FROM messages;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
        console.log(JSON.stringify(row));
        }
        client.end();

        response.render('messages', {"data": res.rows})
});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



