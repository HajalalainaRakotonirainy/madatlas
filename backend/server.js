const routerUrgence = require("./api/routes/urgence");
const routerUtilisateur = require("./api/routes/utilisateur");
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/urgence", routerUrgence);
app.use("/utilisateur", routerUtilisateur);
app.post("/click", (req, res)=>{
    const url = req.body.url.replace('localhost', 'geoserver-sig')
    axios.get(url).then((data)=>{
        res.status(200).json(data.data);        
        res.end()
    })
})

app.listen(3001, console.log("Server started on port 3001"));