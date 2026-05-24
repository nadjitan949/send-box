const RESPONSES = require("../../messages/responses")
const { signUpService, signInService } = require("./auth.service")

async function signUpController(req, res) {

    try {

        await signUpService(req, res)
        
    } catch (error) {
        console.log("Erreur", error)
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        })
    }
    
}

async function signInController(req, res) {

    try {

        await signInService(req, res)
        
    } catch (error) {
        console.log("Erreur", error)
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        })
    }
    
}

module.exports = { signUpController, signInController }