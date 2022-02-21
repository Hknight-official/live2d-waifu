const alexa = require("alexa-bot-api-v3");
const ai = new alexa();
var express = require('express');
var app = express();
var PORT = 3000;

var path = require('path');
app.use('/', express.static('public'));

app.get('/ai', (req, res) => {
    // [] represents context, since it's an array
    let mess = req.query.msg.replace(/[^a-zA-Z ]/g, "");
    console.log(mess);
    ai.getReply(mess, [], "english", "O_o").then((reply) => {
        console.log(reply);
        res.json({msg: reply.split("\n")[0]});
    });
})


app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});