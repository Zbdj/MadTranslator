const express = require('express')
const app = express();

var cors = require('cors')
app.use(cors());

const axios = require('axios')

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb+srv://Zbdj:Rw0pM71iWMGy1r7T@cluster0-zed6f.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, function (err, db) {
  if (!err) {
    console.log("Connection To DataBase");
  }

  if (err) throw err;

  var dbo = db.db("MadWord");
  var RandomWord = "";
  var Note = 5;

    app.get('/:lastScore', function (req, res) {
        var win = "";

        if(req.params.lastScore === "win"){
          win = true
        }else if(req.params.lastScore === "startGame"){
          Note = 5
        }
        else{
          win = false
        }

        dbo.collection("MadWord").find({difficulty : Note}).toArray(function(err,result) {
            //console.log(result)
            if(win === true && Note !== 10){
                Note = Note +1
            }
            else if(win === false && Note !== 1){
                Note = Note  - 1
            }

            RandomWord = result[Math.floor(Math.random() * result.length)].word;
            //console.log(RandomWord)

            axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
                params: {
                key: "trnsl.1.1.20191207T163533Z.3220a5c776decfc5.2ee94ae14fc425c44edc17a3a2e6bc996f916eb5",
                text: RandomWord,
                lang: 'en'
                }
            }).then(rep => {
                //console.log(rep.data)
                var object = {
                    "word": RandomWord,
                    "result": rep.data.text[0],
                    "difficulty":Note,
                }
    
                res.json(object)
            }) 
        })


    })
})

console.log("Port 4000")
app.listen(4000);