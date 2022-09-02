const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const units = "metric";
    const apiKey = "a5e6fab8e0dda784213fb6f0fe05701a";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p></p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>Temperature in " + query + " is " + temp + " degree Celcius</h1>");
            res.write("<img src=" + imageURL + ">");
            
            res.send();
        })
    })
});

app.listen(3000,function(){
    console.log("Server is running on port 3000... ");
}) 

