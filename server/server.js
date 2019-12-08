const express = require('express')
const app = express();

var cors = require('cors')
app.use(cors());

const axios = require('axios')

app.get('/', function (req, res) {

    axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
        params: {
          key: "trnsl.1.1.20191207T163533Z.3220a5c776decfc5.2ee94ae14fc425c44edc17a3a2e6bc996f916eb5",
          text: "Bonjour Monde",
          lang: 'en'
        }
      }).then(rep => {
        //console.log(rep.data)
        var object = {
            "word": "Bonjour Monde",
            "result": rep.data.text[0],
        }

        res.json(object)
      }) 
})

console.log("Port 4000")
app.listen(4000);