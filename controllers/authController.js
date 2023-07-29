const generateJWT = require('../helpers/generateJWT');
const generateTokentRandom = require('../helpers/generateTokentRandom');
const User = require('../models/User');
const createError = require('http-errors');


const register = async(req,res) =>{
    
    try {
        //descontracturamos del req.body
        //name,email, password
        const {name,email, password}= req.body;

        if([name, email, password].includes("") || !name || !email || !password){
            throw createError(400,"Todos los campos son obligatorios!")
        }
        let user= await User.findOne({
            email
        })
        if(user){
            throw createError(400,"El email ya se encuentra registrado!!")
        }
        user = new User(req.body);
        user.token = generateTokentRandom();
        const useStore = await user.save();

        //TODO: ENVIAR EMAIL DE CONFIFUEACION DE REGISTRO
        return res.status(201).json({
            ok: true,
            message : "Usuario registrado con exito"
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            ok: false,
            message : error.message || "ups, ubo un error"
        })
    }
}
const login = async(req,res) => {
    
    try {

        const {email, password} = req.body;
        if([email, password].includes("") || !email || !password){
            throw createError(400,"Todos los campos son obligatorios!")
        }
        // se busca al usuario con el email
        // ya se lo asigma a la variable user
        let user= await User.findOne({
            email
        })
        if(!user){
            throw createError(400,"El usuario no esta registrado!!")
        }
        if (await user.checkedPassword(password)){
            return res.status(200).json({
                ok:true,
                token : generateJWT({
                    user : {
                        id : user._id,
                        name : user.name,
                    }
                })
            })
        }
        else{
            throw createError(403,"Credenciales invalidas")
        }
    } catch (error) {
        return res.status(error.status || 500).json({
            ok: false,
            message : error.message || "ups, ubo un error"
        })
    }
}
module.exports = {
    register,
    login
}