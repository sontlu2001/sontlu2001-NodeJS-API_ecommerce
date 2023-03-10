'use strict'

const { findById } = require("../services/apikey.service")

const HEADER={
    API_KEY:'x-api-key',
    AUTHORIZATION:'authorization'
}
const apiKey = async(req,res,next)=>{
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        console.log(key);
        if(!key) {
            return res.status(403).json({
                message:"Forbidden Error"
            })
        }
        // check object key
        const objKey = await findById(key)
        if(!objKey){
            return res.status(403).json({
                message:"Forbidden Error2"
            })
        }
        req.objKey = objKey
        return next()
    } catch (error) {
        console.log("middleware::checkAuth",error);
    }
}
const permission = (permission)=>{
return (req,res,next)=>{
    if(!req.objKey.permissions){
        return res.status(403).json({
            message:"permission denied"
        })
    }
    console.log("");
    const validPermission = req.objKey.permissions.includes(permission)
    if(!validPermission){
        return res.status(403).json({
            message:"permission denied"
        })
    }
    return next();
}
}

const asyncHandler = (fn) =>{
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}

module.exports={
    apiKey,
    permission,
    asyncHandler
}