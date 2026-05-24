const express = require("express")
const sequelize = require("./database/connection/connect")
const { User, Conversation, Message } = require("./database/relations/relations.model")
const appRoute = require("./app.route")
require("dotenv").config()

const port = process.env.PORT | 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(appRoute)

async function connect() {

    try {
        await sequelize.authenticate()
        console.log("Base de donnée connecté avec succees")
        await sequelize.sync({alter: true})
        console.log("Base de donnée sychronisé avec succes")
    } catch (error) {
        console.log("Erreur l'ors de la connexion et la synchronisation de la base de donné !")
    }  
}
connect()

app.listen(port, () => {
    try {
        console.log(`Serveur en ligne sur le port http://localhost:${port}`)
    } catch (error) {
        
    }
})