import {Request, Response, Router} from "express"
import { Directions, DirRegexp } from "../map/response"
import { NumberRegExp } from "../tools"
import { BeginFight, makeMonster } from "./handler"

const router = Router()


/**
 * @api {get} /monster/info/:id Info
 * @apiGroup Monster
 * 
 * @apiDescription Get information on a monster through the use of an :id
 * 
 * @apiSuccess {[Monster](#api-Types-ObjectMonster)} . it returns the type Monster, not {Monster:{Monster Properties}}
 * 
 */

router.get(`/info/:id${NumberRegExp}`, async (req:Request<{id:string}>, res:Response) => {
    try {
        res.send(await makeMonster(parseInt(req.params.id), req.User.Map.Level))
        return
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})

/**
 * @api {get} /monster/fight/:dir Start Fight
 * @apiGroup Monster
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription Pick a fight with a monster :D
 * 
 * @apiSuccess {[User](#api-Types-ObjectUser)} . it returns the type User, not {User:{User Properties}}.
 * 
 */


router.get(`/fight/:dir${DirRegexp}`, async (req:Request<{dir:Directions}>, res:Response) => {
    try {
        res.send((await BeginFight(req.User, req.params.dir)).FightMode)
        return
    } catch (err) {
        res.send({error:err.toString()})
        return
    }
})

export {router as MonsterRouter}