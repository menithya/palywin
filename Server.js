var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/playwin',function (req,res) {
    var result = [];
    for(var k=0; k<3; k++){
       var random= Math.floor(Math.random()*5)+1;
       result.push(random);
    }

    var bonus= Math.floor(Math.random()*20)+1;
    if(bonus === 7){
        result.push(bonus);
        res.send(JSON.stringify(result))
    }else {
        res.send(JSON.stringify(result));
    }

})
server.listen(port, function() {
    console.log('Server listening at port %d', port);
});