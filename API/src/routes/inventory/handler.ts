import { _cnfPotion_ } from "../../config/configs";
import { UpdateUser } from "../tools";
import { GetStats, Dead } from "../user/handler";
import { User, _userStats_ } from "../user/response";
import { Bags } from "./response";


export async function equip(User:User, id:number):Promise<_userStats_> {
    if (!(Object.keys(User.Inv.Container.Map ? User.Inv.Container.Map : {}).includes(id.toString()))) throw "Non existant item"
    const Item = User.Inv.Container[User.Inv.Container.Map[id]][id]
    if (Item.MType != "Armor") {
            
        throw "Not an equipable"
    }
    
    const firstStats = await GetStats(User)
    const tmp = User.Inv.Armor[Item.Type]
    User.Inv.Armor[Item.Type] = Item
    User.Inv.Container[User.Inv.Container.Map[id]][id] = tmp
    const secondStats = await GetStats(User)
    User.Hp = Math.round(User.Hp * (secondStats.MaxHealth / firstStats.MaxHealth))
    User.Mana = Math.round(User.Mana * (secondStats.MaxMana / firstStats.MaxMana))

    await UpdateUser(User)
    return await GetStats(User)
}


export async function drink(User:User, id:number):Promise<User> {
    const config:_cnfPotion_ = require('../config/config').cnfPotion
    if (!(Object.keys(User.Inv.Container.Map ? User.Inv.Container.Map : {}).includes(id.toString()))) throw "Non existant item"
    const potion = User.Inv.Container[User.Inv.Container.Map[id]][id]
    if (potion.MType != "Potion") throw "Not a potion"
    await drop(User, id)
    if (potion.Permanent) {
        if (potion.Effect == "Poison") throw "Bad Api Code (poison)"
        User[`B${potion.Effect}`] += config.levels[`${potion.Effect}`] * potion.Level
    } else {
        const UserChar = await GetStats(User)
        switch(potion.Effect) {
            case "Health":
                let newHp = Math.round(User.Hp + potion.Level * config.levels.Health)
                if (newHp > UserChar.MaxHealth) newHp = UserChar.MaxHealth
                User.Hp = newHp
                break
            case "Mana": 
                let newMana = Math.round(User.Mana + potion.Level * config.levels.Mana)
                if (newMana > UserChar.MaxMana) newMana = UserChar.MaxMana
                User.Mana = newMana
                break
            case "Poison":
                let newerHp = User.Hp - Math.round(potion.Level * config.levels.Health)
                if (newerHp < 0) User = await Dead(User)
                break
            default:
                User.TmpEffect = {type:potion.Effect, value: Math.round(potion.Level * config.levels[potion.Effect]), MType:"Effect", time: config.times[potion.Effect]}
        }
    }
    UpdateUser(User)
    return User
}


export async function drop(User:User, id:number):Promise<User> {
    if (!(Object.keys(User.Inv.Container.Map ? User.Inv.Container.Map : {}).includes(id.toString()))) throw "Non existant item"
    delete User.Inv.Container[User.Inv.Container.Map[id]][id]
    delete User.Inv.Container.Map[id]   
    await UpdateUser(User)
    return User
}

export async function FreeSpace(User:User):Promise<Bags> {
    const conf = (await import("../../config/config")).cnfInv
    let freeSpace: Bags = {
        Other: 0,
        Potion: 0,
        Rings: 0,
        Scroll: 0
    };
    for (let Bag in User.Inv.Bags) {
        const lvl = User.Inv.Bags[Bag]
        freeSpace[Bag] = eval(conf.Bags[Bag]) - Object.keys(User.Inv.Bags[Bag]).length
    }
    return freeSpace
}
