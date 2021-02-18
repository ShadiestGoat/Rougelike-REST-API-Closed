import {Router, Request, Response} from "express"
import { drink, drop, equip, FreeSpace } from "./handler"
import { Bags } from "./response"
import { dir2coords, NumberRegExp, UpdateUser } from "../tools"
import { GetStats } from "../user/handler"

const router = Router()


/**
 * @api {post} /newUser New User
 * @apiGroup Introduction
 * @apiSampleRequest off
 * @apiDescription Create a new user :D
 * @apiHeader {String} name The name of the user
 *
 * @apiSuccess {[User](#api-Types-ObjectUser)} . it returns the type User, not {User:{User Properties}}.
 * 
 */

/**
 * @api {*} /* Authentication for requests
 * @apiGroup Introduction
 * 
 * @apiDescription Authenticate a request. <br /> First off, all requests under /api/ must be authenticated (except /api/newUser, for obvius reasons). To authenticate one, you will need an id & a token, obtained upon creating a new user
 * @apiSampleRequest off
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user
 * 
 */


/**
 * @api {get} /inventory/drop/:id Drop Item
 * @apiName Drop Item
 * @apiGroup Inventory
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user
 * @apiDescription drops the item witht he id
 * 
 * @apiSuccess {[User](#api-Types-ObjectUser)} . it returns the type User, not {User:{User Properties}}.
*/

router.get(`/drop/:id${NumberRegExp}`, async (req:Request<{id:string}>, res:Response) => {
    try {
        res.send(await drop(req.User, parseInt(req.params.id)))
        return
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})

/**
 * @api {get} /inventory/drink/:id Drink Potion
 * @apiName Drink the potion
 * @apiGroup Inventory
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription Dring potion with id=id
 * 
 * @apiSuccess {[User](#api-Types-ObjectUser)} . it returns the type User, not {User:{User Properties}}.
 * 
*/

router.get(`/drink/:id${NumberRegExp}`, async (req:Request<{id:string}>, res:Response) => {
    try {
        res.send(await drink(req.User, parseInt(req.params.id)))
        return
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})

/**
 * @api {get} /inventory/equip/:id Equip Armor/Weapon
 * @apiName Equip item
 * @apiGroup Inventory
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription equips an item using id. Must be a weapon or an armor
 * 
 * @apiSuccess {[User](#api-Types-ObjectUser)} . it returns the type User, not {User:{User Properties}}.
 * 
*/

router.get(`/equip/:id${NumberRegExp}`, async (req:Request<{id:string}>, res:Response) => {
    try {
        res.send(await equip(req.User, parseInt(req.params.id)))
        return
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})

/**
 * @api {get} /inventory/freeSpace Free space
 * @apiName Free Space
 * @apiGroup Inventory
 * 
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription gets the amount of free space one has in their bags
 * 
 * @apiSuccess {Number} Other the freespace one has in their 'Other' container
 * @apiSuccess {Number} Potion the freespace one has in their 'Potion' container
 * @apiSuccess {Number} Scroll the freespace one has in their 'Scroll' container
 * @apiSuccess {Number} Rings the freespace one has in their 'Rings' container
 * 
*/

router.get(`/freeSpace`, async (req:Request<{id:string}>, res:Response) => {
    try {
        res.send(await FreeSpace(req.User))
        return
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})

/**
 * @api {get} /inventory/storageMax Max space
 * @apiGroup Inventory
 * 
 * @apiHeader {String} id The name of the user
 * @apiHeader {String} token The name of the user

 * @apiDescription gets the amount of max storage space one has in their bags
 * 
 * @apiSuccess {Number} Other the max amount of storage space on has in their 'Other' container
 * @apiSuccess {Number} Potion the max amount of storage space on has in their 'Potion' container
 * @apiSuccess {Number} Scroll the max amount of storage space on has in their 'Scroll' container
 * @apiSuccess {Number} Rings the max amount of storage space on has in their 'Rings' container
 * 
*/

router.get(`/storageMax`, async (req:Request<{id:string}>, res:Response) => {
    try {
        const conf = (await import('../../config/config')).cnfInv.Bags
        let bags:Bags = {Other: 0, Potion: 0, Rings: 0, Scroll:  0}

        for (let bag in req.User.Inv.Bags) {
            let lvl = req.User.Inv.Bags[bag]
            bags[bag] = eval(conf[bag])
        }
        res.send(bags)
        return
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})



export {router as InvRouter}