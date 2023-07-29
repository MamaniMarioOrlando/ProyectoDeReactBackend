const createError = require('http-errors')
const { verify } = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async(req,res,next)=>{

    try {
        if(!req.headers.authorization){
           throw createError(400, "Se requiere Token!")
        }

        const token = req.headers.authorization
        const decoded = verify(token, process.env.JWT_SECRET)

        req.user = await User
                        .findById(decoded.user.id)
                        .select("-__v -updatedAt -createdAt -token -password -checked -_id")
        next()
    } catch (error) {
        let message
        switch (error.message) {
            case "jwt malformed":
                message = "El jwt esta mal formado"
                break;
            case "jwt expired":
                message = "El jwt ya expiro"
                break;
            case "invalid token":
                message = "El token es invalido"
                break;
            case "invalid signature":
                message = "Firma inválida"
                break;
            default:
                message = error.message
                break;
        }
        return res.status(error.status || 500).json({
            ok : false,
            message : message || "hubo un problema!"
        })
    }
}