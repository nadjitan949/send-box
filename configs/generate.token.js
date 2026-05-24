const jwt = require("jsonwebtoken")

function generateToken(userId) {
    try {

        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE_IN}
        )

        return token
        
    } catch (error) {
        console.log("Erreur l'ors de la generation du token", error)
    }
}

module.exports = generateToken