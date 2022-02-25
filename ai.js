const alexa = require("alexa-bot-api-v3");
const ai = new alexa();
const axios = require('axios');
var express = require('express');
var app = express();
var PORT = 3000;

var path = require('path');
app.use('/', express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let waifu = req.query.waifu;
    if (!waifu) {
        waifu = 'rem';
    }
    res.render('index', {
        waifu: waifu
    });
})

app.get('/ai', (req, res) => {
    // [] represents context, since it's an array
    let mess = req.query.msg.replace(/[^a-zA-Z ]/g, "");
    ai.getReply(mess, [], "english", "O_o").then((reply) => {
        console.log(reply);
        res.json({msg: reply.split("\n")[0]});
    });
})

app.get('/voice', (req, res) => {
    // [] represents context, since it's an array
    let msg = req.query.msg;
    axios.post('https://play.ht/api/transcribe', {
        userId:"public-access",
        platform:"landing_demo",
        ssml:`<speak><p>${msg}</p></speak>`,
        voice:"ja-JP-NanamiNeural",
        narrationStyle:"regular"
        })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
})


app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});