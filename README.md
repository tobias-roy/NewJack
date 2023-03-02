# NewJack
NewJack is a school project with focus on building a blackjack application using JavaScript. <br>
Reference: [MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
## Dependencies
#### Node
Make sure you have [Node.js](https://nodejs.org/en/) installed. <br>
Navigate to the project folder and run the following command to install dependencies:
```
npm install
```
#### Node server
For statistic purposes of games won/lost/draw and total this project uses a CRUD Node.JS server. <br>
Create a folder using your cli with the command:
```
mkdir nodeserver
```
Navigate to the folder and run the following commands:
```
npm i
npm i express
npm i cors
npm i body-parser
```
Create a new file and name it "server.js". <br>
Using macOS cli
```
echo file > server.js
```
Add the following code to the file:
```
const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let gameData = {
  won: 0,
  houseWon: 0,
  totalgames: 0,
  draw: 0,
};

app.get("/gamedata", (req, res) => {
  console.log("getting Data");
  console.log(gameData);
  res.send(gameData);
});

app.post("/gamedata", (req, res) => {
  console.log("posting data");
  gameData = req.body;
  console.log(req.body);
});

app.post("/updatehousewon", (req, res) => {
  gameData.houseWon++;
  gameData.totalgames++;
  console.log(gameData);
});

app.post("/updatewon", (req, res) => {
  gameData.won++;
  gameData.totalgames++;
  console.log(gameData);
});

app.post("/updatedraw", (req, res) => {
  gameData.draw++;
  gameData.totalgames++;
  console.log(gameData);
});

app.listen(port, () => {
  console.log(`Node server is running on ${port}`);
});
```
Now run the following in your CLI and you're good to go:
```
node server.js
```

## Usage
#### Development
To run the website in development mode use the following command in the project folder:
```
npm run dev
```
This will host a local development version of the application on [http://localhost:5173/](http://localhost:5173/)

#### Production
```
Don't
```

## Future development
#### Multiplayer
- Local multiplayer will be added in the future
#### AI Multiplayer
- Option to add AI of various difficulty will be added in the future
