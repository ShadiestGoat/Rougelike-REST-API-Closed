import { Request, Response, NextFunction, Router } from "express";
import { User } from "./user/response"
import { mod, SH as UserSH } from "../models/user"


export function Validator(req:Request, res:Response, next:NextFunction) {
    if (!req.headers.token || !(typeof req.headers.token == "string" || typeof req.headers.token == "number") ) {
        res.send({error: "No Authorization header! (token)"})
        return
    }
    if (!req.headers.id || !(typeof req.headers.id == "string" || typeof req.headers.id == "number")) {
        res.send({error: "No Authorization header! (id)"})
        return
    }
    mod.findOne({Token: req.headers.token.toString(), id:req.headers.id.toString()}).exec().then((user) => {
        if (!user) {res.send({error: "No user has been created!"}); return}
        // alrighty time to yeet of some random __ids n shizz. This makes mongoose happy :)
        let ObjUser = user
        
        req.User = ObjUser
        next()
    })
    return
}