var express = require('express');
var app = express();

var pg = require("pg"); // This is the postgres database connection module.
const { Client } = require('pg');

var connectionString = process.env.DATABASE_URL;
//var connectionString = "postgres://ta_user:ta_pass@localhost:5432/inbox";


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getPerson', function(request, response) {

    const client = new pg.Client(connectionString);
    client.connect();

    var sql = "SELECT * FROM messages;";
    client.query(sql, (err, res) => {
        if (err) 
          throw err;
        for (let row of res.rows) {
        console.log(JSON.stringify(row));
        }

        response.render('pages/messages', {"data": res.rows})

        client.end();
});   
});

app.get('/getPerson/:id', function(request, response) {

    const client = new pg.Client(connectionString);
    client.connect();

    var sql = "SELECT * FROM messages WHERE sender = '" + request.params.id + "';";
    client.query(sql, (err, res) => {
        if (err) 
          throw err;
        for (let row of res.rows) {
        console.log(JSON.stringify(row));
        }

        response.render('pages/messages', {"data": res.rows})

        client.end();
});   
});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


 
