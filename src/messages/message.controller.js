const RESPONSES = require("../../messages/responses");
const {
    sendMessageService,
    markAsReadService,
    updateMessageService,
    deleteMessageService
} = require("./message.service");

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

async function markAsReadController(req, res) {

    try {

        await markAsReadService(req, res)

    } catch (error) {
        console.error("Erreur envoi message:", error);
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        });
    }

}

async function updateMessageController(req, res) {

    try {

        await updateMessageService(req, res)

    } catch (error) {
        console.error("Erreur envoi message:", error);
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        });
    }

}

async function deleteMessageController(req, res) {

    try {

        await deleteMessageService(req, res)

    } catch (error) {
        console.error("Erreur envoi message:", error);
        return res.status(RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            success: RESPONSES.INTERNAL_SERVER_ERROR.success,
            message: RESPONSES.INTERNAL_SERVER_ERROR.message
        });
    }

}

module.exports = {
    sendMessageController,
    markAsReadController,
    updateMessageController,
    deleteMessageController
}