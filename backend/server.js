const routerUrgence = require("./api/routes/urgence");
const routerUtilisateur = require("./api/routes/utilisateur");
const express = require("express");
//const cors = require("cors")

const app = express();

app.use(express.json());
//app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/urgence", routerUrgence);
app.use("/utilisateur", routerUtilisateur);

app.listen(3001, console.log("Server started on port 3001"));