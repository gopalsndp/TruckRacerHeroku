var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

// set static directories
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// app.use('/scripts/jquery.min.js', express.static(__dirname + '/node_modules/jquery/jquery.min.js'));
app.use('/scripts', express.static(__dirname + '/node_modules/knockout/build/output'));
app.use('/scripts', express.static(__dirname + '/node_modules/knockout-postbox/build'));
app.use('/scripts', express.static(__dirname + '/node_modules/knockout-validation/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules/knockout.validation/dist'));
app.use('/font-awesome/css/font-awesome.min.css', express.static(__dirname + '/node_modules/font-awesome/css/font-awesome.min.css'));
// app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.get('/', function (req, res) {
    // tell express to serve static files from the special
    // node variable __dirname which contains the current
    // folder
    res.sendFile(path.join(__dirname+ '/public/pages/index.html'));
});

app.get("/api/todos", function(req, res) {
    res.status(200).json([
    { id: 1, name: "Item 1 from server", complete: false },
    { id: 2, name: "Item 2 from server", complete: false },
    { id: 3, name: "Completed Item from server", complete: true }
    ]);
    res.end();
});

app.put("/api/todos/:todoId", function(req, res) {
    console.log(req.params.todoId + ": " + JSON.stringify(req.body, null, 4));
    res.status(200);
    res.end();
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
// var server = app.listen(3001, function () {
//   var host = server.address().address;
//   var port = server.address().port;
//
//   console.log('Example app listening at http://%s:%s', host, port);
// });
