var express = require('express');
var app = express();

var pg = require("pg"); // This is the postgres database connection module.
const { Client } = require('pg');

var connectionString = "postgres://gudqbffhpdwnmx:2b1f8bb5a9e04fb53f09047dc0ff21a2c460ad5991b90fa1bdb7376db807dbfd@ec2-107-20-255-96.compute-1.amazonaws.com:5432/postgresql-asymmetrical-63190";

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getPerson/:id', function(request, response) {

    const client = new Client(connectionString);
    client.connect();
    client.query('SELECT * FROM messages;', (err, res) => {
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


 
