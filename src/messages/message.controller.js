const RESPONSES = require("../../messages/responses");
const { sendMessageService } = require("./message.service");

async function sendMessageController(req, res) {

    try {

        await sendMessageService(req, res)
        
    } catch (error) {
        console.error("Erreur envoi message:", error);
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        });
    }
    
}

module.exports = { sendMessageController }