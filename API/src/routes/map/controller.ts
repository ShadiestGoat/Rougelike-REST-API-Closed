import {Router, Request, Response} from "express"
import {Generate, Move, OpenChest, } from "./handler"
import {DirRegexp, Directions} from "./response"
import { dir2coords, UpdateUser } from "../tools"
import { GetStats } from "../user/handler"
import { mod } from "../../models/backupUser"
import { userInfo } from "os"
import { Dir } from "fs"
import { Armor, Item } from "../inventory/response"
const router = Router()


/* key
current player pos - ◈
nothingness - ▢
wall - ▩
chest - ▣
monster - △
challenger room - ▷
**/

/**
 * @api {get} /map/generate Generate Example Map
 * @apiGroup Map
 * @apiDescription Generates an example map
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiSuccess {[Map](#api-Types-ObjectMap)} . it returns the type Map, not {Map:{Map Properties}}.
 */

router.get(`/generate`, async (req:Request, res:Response) => {
    const resp = await Generate(1)
    res.send(resp)
    return
})

/**
 * @api {get} /map/move/:dir Move
 * @apiGroup Map
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription Move in the direction :dir. 
 * 
 * @apiSuccess {[Map](#api-Types-ObjectMap)} . it returns the type Map, not {Map:{Map Properties}}.
 */

router.get(`/move/:dir${DirRegexp}`, async (req:Request<{dir: Directions}>, res:Response) => {
    let amount = 1
    if (req.query.amount) {
        if (isNaN(parseInt(req.query.amount.toString()))) {
            res.send({error: `Query 'amount' must be a number!`})
            return
        }
        amount = parseInt(req.query.amount.toString())
    }
    try {
        const resp = await Move((req.params.dir), amount, req.User.Map, req.User)
        res.send(resp.Map)
    } catch (err) {
        res.send({error:err.toString()})
    }


})

/**
 * @api {get} /map/display Display the map
 * @apiGroup Map
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription This bares no purpose as an api standpoint, but this basically shows the user's map as an actual map!
 * 
 * @apiSuccess {Text} . Plain text of the map
 */

router.get(`/display`, async (req:Request, res:Response) => {
    let lay = ""
    for (var row of req.User.Map.layout) {
        for (var tile of row) {
            lay += tile
        }
        lay += "<br />"
    }
    res.send(lay)
    return
})

/**
 * @api {get} /map/up/:dir Up
 * @apiGroup Map
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription Up the map's level, exit being in 1 coord in :dir direction
 * @apiSuccess {[Map](#api-Types-ObjectMap)} . it returns the type Map, not {Map:{Map Properties}}.
 */

router.get(`/up/:dir${DirRegexp}`, async (req:Request<{dir:Directions}>, res:Response) => {
    const exitCoords = await dir2coords(req.User.Map.UserPos, req.params.dir)
    if (exitCoords != req.User.Map.ExitCoord) {res.send({error: "Not an exit"}); return}
    let lvl = req.User.Map.NextLevel ? req.User.Map.NextLevel : req.User.Map.Level + 1

    const newMap = await Generate(lvl)

    req.User.Map = newMap

    if (newMap.NextLevel) {
        const stats = await GetStats(req.User)
        req.User.Hp = stats.MaxHealth
        req.User.Mana = stats.MaxMana
        req.User.Checkpoints.push(newMap.NextLevel - 1)   
        const backup = mod.findOne({id:req.User.id, Token: req.User.Token})
        const User = req.User
        for (let Armor in User.Inv.Armor) {
            if ((User.Inv.Armor[Armor] as Armor).Quality == "Bad") {
                delete User.Inv.Armor[Armor]
            }
        }
        for (let Bag in User.Inv.Container) {
            for (let item in User.Inv.Container[Bag]) {
                if ((User.Inv.Container[Bag][item] as Item).MType == "Potion") {
                    delete User.Inv.Container.Potion[item]
                    delete User.Inv.Container.Map[item]
                }
                if (User.Inv.Container[Bag][item].Quality == "Bad") {
                    delete User.Inv.Container[Bag][item]
                    delete User.Inv.Container.Map[item]
                }
            }
        }
 
        if (backup) {
            mod.findOneAndReplace({id:req.User.id, Token: req.User.Token}, User)
        } else {
            await new mod(req.User).save()
        }
    }
    await UpdateUser(req.User)
    return newMap
})

/**
 * @api {get} /map/open/:dir Open
 * @apiGroup Map
 * 
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription Open a chest in :dir direction
 * 
 * @apiSuccess {Item} Item This returns an item to you, and also adds it to your container.
 */

router.get(`/open/:dir${DirRegexp}`, async (req:Request<{dir: Directions}>, res:Response) => {
    try {
        res.send(await OpenChest(req.User, req.params.dir))
    } catch (err) {
        if (err.toString().startsWith('TypeError: Cannot set property')) {
            err = "Out of bounds!"
        }
        res.send({error: err.toString()})
    }
})


export {router as MapRouter}