import {Request, Response, Router} from "express"
import { Attack, GetStats } from "./handler"

const router = Router()

router.get('/stats', async (req:Request, res:Response) => {
    res.send(await GetStats(req.User))
    return
})

/**
 * @api {get} /user/stats User Stats
 * @apiName GetStats
 * @apiGroup User
 * 
 * @apiDescription this is to get temperary stats like MaxHealth, Defense, MaxMana 
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiSuccess {Number} MaxHealth The user's max health
 * @apiSuccess {Number} MaxMana The user's max mana
 * @apiSuccess {Number} Strength The attack of the user
 * @apiSuccess {Number} Defense User's defense
 * @apiSuccess {Number} Power How powerfull a user's magic is
 * @apiSuccess {Number} Luck How lucky a user is
 * @apiSuccess {[Element](#api-Types-ObjectElement)} Elmnt The user's element stats
 *
*/

router.get('/info', async (req:Request, res:Response) => {
    res.send(req.User) 
    return
})

/**
 * @api {get} /user/info User object
 * @apiGroup User
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription Get the full User Object 
 * 
* @apiSuccess {[User](#api-Types-ObjectUser)} . it returns the type User, not {User:{User Properties}}.
 * 
*/

router.get('/fight/attack', async (req:Request, res:Response) => {
    if (!req.User.FightMode) {res.send({error: "Not in a fight"}); return}
    try {
        res.send(await Attack(req.User))
    } catch (err) {
        console.error(err)
        res.send({error: err.toString()})
    }
    return
})

/**
 * @api {get} /user/fight/attack Continue fight
 * @apiGroup User
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription This will attack the monster you are in a fight with 
 * 
 * @apiSuccess {Number} DamageDealt the damage given onto the the monster
 * @apiSuccess {Boolean} Crit Weather the thit was a critical one
 * @apiSuccess {Boolean} Dodged Weather you dodged the attack
 * @apiSuccess {Boolean} MonsterDead Weather or not you killed the monster
 * @apiSuccess {Boolean} UserDead if you died or not
 * @apiSuccess {Boolean} LeveledUp weather or not the user has leveled up
 * 
 * 
*/




export {router as UserRouter}