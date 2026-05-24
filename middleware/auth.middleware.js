const jwt = require("jsonwebtoken");
const RESPONSES = require("../messages/responses"); // Ajuste le chemin
const User = require("../database/models/users.model");

async function authMiddleware(req, res, next) {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(RESPONSES.UNAUTHORIZED.status).json({
                success: RESPONSES.UNAUTHORIZED.success,
                message: "Accès refusé, aucun token fourni"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findByPk(decoded.userId);
        
        if (!currentUser) {
            return res.status(RESPONSES.UNAUTHORIZED.status).json({
                success: RESPONSES.UNAUTHORIZED.success,
                message: "L'utilisateur associé à ce token n'existe plus"
            });
        }
        req.user = currentUser;
        next();

    } catch (error) {
        console.error("Erreur Middleware Auth:", error);
        return res.status(RESPONSES.UNAUTHORIZED.status).json({
            success: RESPONSES.UNAUTHORIZED.success,
            message: "Token invalide ou expiré"
        });
    }
}

module.exports = { authMiddleware };