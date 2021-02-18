import {Monster} from "./response"
import { _cnfMonster_ } from "../../config/configs"
import { Directions, Coords } from "../map/response"
import { User } from "../user/response"
import { dir2coords, randInt, UpdateUser } from "../tools"


export async function makeMonster(id:number, lvl:number, Coords?:Coords):Promise<Monster> {
    const conf:_cnfMonster_ = require('../../config/config').cnfMonster
    if (!(Object.keys(conf).includes(id.toString()))) throw "Bad Id"
    const config = conf[id]
    let monster:Monster = {
        Type: id,
        Attack: 0,
        Level: lvl,
        Elmnt: {},
        ExpGiven: 0,
        MoneyGiven: randInt(5, 40),
        HP: 0,
        MaxHealth: 0,
        Defense: 0,
        Coords: Coords ? Coords : [0,0]
    }
    let Level = 0
    if (lvl/2 <= 4) {Level = 1} else {Level = lvl/4}
    for (var elmnt in config.Elmnt) {
        monster.Elmnt[elmnt] = {Attack: Math.round(config.Elmnt[elmnt].Attack * Level), Defense: Math.round(config.Elmnt[elmnt].Defense * Level) }
    }
    monster.Attack = Math.round(config.Attack * Level)
    monster.Defense = Math.round(config.Defense * Level)
    monster.ExpGiven = Math.round(config.XpGiven * Level)
    monster.MaxHealth = Math.round(config.baseHP * Level)
    monster.HP = monster.MaxHealth
    return monster
}

export async function BeginFight(User:User, dir:Directions):Promise<User> {
    if (User.FightMode) throw "Already in fight"
    let mosnstrCoord:Coords = User.Map.UserPos

    mosnstrCoord = await dir2coords(mosnstrCoord, dir)

    if (User.Map.layout[mosnstrCoord[0]][mosnstrCoord[1]] != "△") throw "No Monster at given position"
    
    const MonstrId = User.Map.MonsterKey[mosnstrCoord.toString()]
    if (!MonstrId) throw "Bad Api Code (!MonstrdId)"
    let returnUser:User = User
    returnUser.FightMode = await makeMonster(MonstrId, User.Map.Level, mosnstrCoord)
    await UpdateUser(returnUser)
    return returnUser
}