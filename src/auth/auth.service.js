const generateToken = require("../../configs/generate.token")
const User = require("../../database/models/users.model")
const RESPONSES = require("../../messages/responses")
const bcrypt = require("bcrypt")

async function signUpService(req, res) {

    try {

        const { username, password } = req.body
        const existUser = await User.findOne({ where: { username } })
        if (existUser) {
            return res.status(RESPONSES.CONFLICT.status).json({
                success: RESPONSES.CONFLICT.success,
                message: "Ce nom d'utilisateur est déjà pris, veuillez en choisir un autre"
            })
        }

        const hasPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ ...req.body, password: hasPassword })

        return res.status(RESPONSES.OK.status).json({
            success: RESPONSES.OK.success,
            message: "Compte crée avec success",
        })

    } catch (error) {
        console.log("Erreur", error)
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        })
    }

}

async function signInService(req, res) {

    try {

        const { username, password } = req.body
        const user = await User.findOne({where: {username}})

        if(!user){
            return res.status(RESPONSES.UNAUTHORIZED.status).json({
                success: RESPONSES.UNAUTHORIZED.success,
                message: "Nom d'utilisateur ou email incorect !"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(RESPONSES.UNAUTHORIZED.status).json({
                success: RESPONSES.UNAUTHORIZED.success,
                message: "Nom d'utilisateur ou email incorect !"
            })
        }

        const token = generateToken(user.id)

        return res.status(RESPONSES.OK.status).json({
            success: RESPONSES.OK.success,
            message: "Connexion réussie",
            token
        })

    } catch (error) {
        console.log("Erreur", error)
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        })
    }

}

module.exports = { signUpService, signInService }