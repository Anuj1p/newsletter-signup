const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members :[
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/5188638769";

    const options = {
        method : "POST",
        auth : "anuj:184eaf2d619f6e97cf206248dd789951-us7"
    }

    const request = https.request(url, options, function(responce){

        if(responce.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        responce.on("data", function(data){
            console.log(JSON.parse(data));
        });
    }) ;

     request.write(jsonData);
     request.end();
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server start at port number 3000");
});

// API Id
// 184eaf2d619f6e97cf206248dd789951-us7

// List Id
// 5188638769