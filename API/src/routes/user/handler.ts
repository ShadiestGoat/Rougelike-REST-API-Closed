import { User, _userStats_, FightStats } from "./response"
import { ArmorList, _effect_ } from "../inventory/response"
import { chance, UpdateUser } from "../tools"
import { elmnts, HardElmnt, _Element_, _ElmntAtDef_ } from "../../config/interfaces"
import { mod } from "../../models/user"
import { Generate } from "../map/handler"
import { randomBytes } from "crypto"
import { Monster } from "../monster/response"


export async function GetStats(User:User):Promise<_userStats_> {
    
    var stats: _userStats_ = {MaxHealth: User.BHealth, 
                              MaxMana: User.BMana, 
                              Defense: User.BDefense,
                              Luck: User.BLuck, 
                              Power: User.Power, 
                              Strength: User.BStrength,
                              Elmnt: User.Elmnt
                            }
    

    stats[User.TmpEffect?.type ] += User.TmpEffect?.value

    for (var Type of ArmorList) {
        stats.Defense += User.Inv.Armor[Type].Defense 
        stats.MaxHealth += User.Inv.Armor[Type].Health
        
        // enchantment
        if (User.Inv.Armor[Type].Enchantment) {
            if (User.Inv.Armor[Type].Enchantment.type == "Elmnt") {
                for (const key in User.Inv.Armor[Type].Enchantment.Elmnt) {
                    stats.Elmnt[key] = {Attack: stats.Elmnt[key].Attack ?? 0 + (User.Inv.Armor[Type].Enchantment[key].Attack ?? 0), Defense: stats.Elmnt[key].Defense ?? 0 + (User.Inv.Armor[Type].Enchantment[key].Defense ?? 0)}
                }
            } else {
                stats[User.Inv.Armor[Type].Enchantment.type] += User.Inv.Armor[Type].Enchantment.value
            }
        }
        // ability 1
        if (User.Inv.Armor[Type].Ability1.type == "Elmnt") {
            for (const key in User.Inv.Armor[Type].Ability1.Elmnt) {
                stats.Elmnt[key] = {Attack: stats.Elmnt[key].Attack ?? 0 + (User.Inv.Armor[Type].Ability1[key].Attack ?? 0), Defense: stats.Elmnt[key].Defense ?? 0 + (User.Inv.Armor[Type].Ability1[key].Defense ?? 0)}
            }
        } else {
            stats[User.Inv.Armor[Type].Ability1.type] += User.Inv.Armor[Type].Ability1.value
        }
        // ability 2
        if (User.Inv.Armor[Type].Ability2.type == "Elmnt") {
            for (const key in User.Inv.Armor[Type].Ability2.Elmnt) {
                stats.Elmnt[key] = {Attack: stats.Elmnt[key].Attack ?? 0 + (User.Inv.Armor[Type].Ability2[key].Attack ?? 0), Defense: stats.Elmnt[key].Defense ?? 0 + (User.Inv.Armor[Type].Ability2[key].Defense ?? 0)}
            }
        } else {
            stats[User.Inv.Armor[Type].Ability2.type] += User.Inv.Armor[Type].Ability2.value
        }
        
    }

    if (User.Inv.Weapon.Enchantment) {
        if (User.Inv.Weapon.Enchantment.type == "Elmnt") {
            for (const key in User.Inv.Weapon.Enchantment.Elmnt) {
                stats.Elmnt[key] = {Attack: stats.Elmnt[key].Attack ?? 0 + (User.Inv.Weapon.Enchantment[key].Attack ?? 0), Defense: stats.Elmnt[key].Defense ?? 0 + (User.Inv.Weapon.Enchantment[key].Defense ?? 0)}
            }
        } else {
            stats[User.Inv.Weapon.Enchantment.type] += User.Inv.Weapon.Enchantment.value
            }
        }
        // ability 1
        if (User.Inv.Weapon.Ability1.type == "Elmnt") {
            for (const key in User.Inv.Weapon.Ability1.Elmnt) {
                stats.Elmnt[key] = {Attack: stats.Elmnt[key].Attack ?? 0 + (User.Inv.Weapon.Ability1[key].Attack ?? 0), Defense: stats.Elmnt[key].Defense ?? 0 + (User.Inv.Weapon.Ability1[key].Defense ?? 0)}
            }
        } else {
            stats[User.Inv.Weapon.Ability1.type] += User.Inv.Weapon.Ability1.value
        }
        // ability 2
        if (User.Inv.Weapon.Ability2.type == "Elmnt") {
            for (const key in User.Inv.Weapon.Ability2.Elmnt) {
                stats.Elmnt[key] = {Attack: stats.Elmnt[key].Attack ?? 0 + (User.Inv.Weapon.Ability2[key].Attack ?? 0), Defense: stats.Elmnt[key].Defense ?? 0 + (User.Inv.Weapon.Ability2[key].Defense ?? 0)}
            }
        } else {
            stats[User.Inv.Weapon.Ability2.type] += User.Inv.Weapon.Ability2.value
        }

    return stats
}

function ElmntGen(Elmnt:_Element_):HardElmnt {
    if (!Elmnt || (!Elmnt.Air && !Elmnt.Earth && !Elmnt.Fire && !Elmnt.Water)) {
        return {
            Air: {Attack: 0, Defense: 0},
            Earth: {Attack: 0, Defense: 0},
            Fire: {Attack: 0, Defense: 0},
            Water: {Attack: 0, Defense: 0}
        }
    }
    console.log(Elmnt)
    for (let elmnt of elmnts) {
        Elmnt[elmnt] = Elmnt[elmnt] ? {Attack: Elmnt[elmnt].Attack ?? 0, Defense: Elmnt[elmnt].Defense ?? 0} : {Attack: 0, Defense: 0}
    }
    return (Elmnt as HardElmnt)
}

async function ElmntAttack(AttackElmnt:_Element_, DefElmnt:_Element_):Promise<number> {
    let Damage = 0
    AttackElmnt = ElmntGen(AttackElmnt)
    DefElmnt = ElmntGen(DefElmnt)

    for (var elmnt in AttackElmnt) {
        let res =  AttackElmnt[elmnt].Attack ?? 0 - DefElmnt[elmnt].Defense
        if (res < 0) res = 0
            Damage += Math.round(res * 1.25)
    }
    return Damage
}

export function xpHandler(User:User, xp:number) {
    User.xp += xp
    const required = Math.round(7 * Math.pow(User.lvl, 2) + 50 * User.lvl + 300)
    if (User.xp >= required) {
        User.lvl++
        User.xp = User.xp - required
        User.BDefense += User.lvl + 10
        User.BHealth += User.lvl + 20
        if (chance(30)) {
            User.BLuck++
        }
        User.BMana += 15
        User.BStrength += User.lvl + 10
    }
    return User
}

export async function MonsterAttack(User:User):Promise<false | number> {
    const stats = await GetStats(User)
    let Damage:number = 0
    if (chance(stats.Luck)) {
        return false
    } else {
        let elmnts:_Element_ = {
            Fire: (User.FightMode as Monster).Elmnt.Fire ?? {Attack: 0, Defense: 0},
            Air: (User.FightMode as Monster).Elmnt.Air ?? {Attack: 0, Defense: 0},
            Earth: (User.FightMode as Monster).Elmnt.Earth ?? {Attack: 0, Defense: 0},
            Water: (User.FightMode as Monster).Elmnt.Water ?? {Attack: 0, Defense: 0},
        }
        Damage += await ElmntAttack(elmnts, stats.Elmnt)
        Damage += (User.FightMode as Monster).Attack
    }
    if (stats.Defense >= Damage) {
        Damage = 0
    } else {
        Damage -= stats.Defense
    }
    return Damage
}

export async function Dead(User:User):Promise<User> {
    const BackupUser = await mod.findOne({id: User.id, Token:User.Token})
    if (!BackupUser) {
        User = await newUser(User.Name)
    } else {
        User = BackupUser
    }
    await UpdateUser(User)
    return User
}

export async function Attack(User:User):Promise<FightStats> {
    let retrunStats:FightStats = {
        MonsterHP: 0,
        DamageDealt: 0,
        Crit: false,
        Dodged: true,
        MonsterDead: false,
        UserDead: false,
        LeveledUp: false
    }
    if (!User.FightMode) throw "User not in fight"
    const stats = await GetStats(User)

    retrunStats.DamageDealt += stats.Strength
    retrunStats.DamageDealt += await ElmntAttack(stats.Elmnt, User.FightMode.Elmnt)

    if (chance(3)) {
        retrunStats.DamageDealt += stats.Strength * 2
        retrunStats.Crit = true
    }
    User.FightMode.HP -= retrunStats.DamageDealt
    
    retrunStats.MonsterHP = User.FightMode.HP
    
    if (User.FightMode.HP < 0) {
        retrunStats.Dodged = false
        const oldLvl = User.lvl
        User.Map.layout[User.FightMode.Coords[0]][User.FightMode.Coords[1]] = "▢"
        User.Money += User.FightMode.MoneyGiven
        User= xpHandler(User, User.FightMode.ExpGiven)
        if (oldLvl !=User.lvl) retrunStats.LeveledUp = true
        User.FightMode = false
        retrunStats.MonsterDead = true
        await UpdateUser(User)
        return retrunStats
    }
    
    const MonsterAttackVal = await MonsterAttack(User)

    if (MonsterAttackVal) {
        User.Hp -= MonsterAttackVal
    }
    
    if (User.Hp < 0) {
        User = await Dead(User)
        retrunStats.UserDead = true
    }

    await UpdateUser(User)

    return retrunStats

}

export async function newUser(name:string, id?:string, token?:string):Promise<User> {
    const User:User = {
        id: "0",
        Name: name,
        Token: "",
        BDefense: 1,
        BHealth: 600,
        BLuck: 1,
        BMana: 100,
        BStrength: 10,
        Elmnt: {},
        Kills: 0,
        Power: 1,
        xp: 0,
        lvl: 0,
        Hp: 600,
        Mana: 100,
        Checkpoints: [],
        FightMode: false,
        Money: 0,
        Map: await Generate(1),
        Inv: {
            Armor: {
                Boots: {
                    MType: "Armor",
                    Defense: 1,
                    Health: 1,
                    Quality: "Good",
                    Set: 0,
                    Type: "Boots",
                    Ability1: {
                        type: "Strength",
                        value: 1
                    },
                    Ability2: {
                        type: "Strength",
                        value: 1
                    }
                },
                Chestplate: {
                    MType: "Armor",
                    Defense: 1,
                    Health: 1,
                    Quality: "Good",
                    Set: 0,
                    Type: "Chestplate",
                    Ability1: {
                        type: "Strength",
                        value: 1
                    },
                    Ability2: {
                        type: "Strength",
                        value: 1
                    }
                },
                Helmet: {
                    MType: "Armor",
                    Defense: 1,
                    Health: 1,
                    Quality: "Good",
                    Set: 0,
                    Type: "Helmet",
                    Ability1: {
                        type: "Strength",
                        value: 1
                    },
                    Ability2: {
                        type: "Strength",
                        value: 1
                    }
                },
                Necklace: {
                    MType: "Armor",
                    Defense: 1,
                    Health: 1,
                    Quality: "Good",
                    Set: 0,
                    Type: "Necklace",
                    Ability1: {
                        type: "Strength",
                        value: 1
                    },
                    Ability2: {
                        type: "Strength",
                        value: 1
                    }
                },
                Pants: {
                    MType: "Armor",
                    Defense: 1,
                    Health: 1,
                    Quality: "Good",
                    Set: 0,
                    Type: "Pants",
                    Ability1: {
                        type: "Strength",
                        value: 1
                    },
                    Ability2: {
                        type: "Strength",
                        value: 1
                    }
                },
                Ring: {
                    MType: "Armor",
                    Defense: 1,
                    Health: 1,
                    Quality: "Good",
                    Set: 0,
                    Type: "Ring",
                    Ability1: {
                        type: "Strength",
                        value: 1
                    },
                    Ability2: {
                        type: "Strength",
                        value: 1
                    }
                }
            },
            Weapon: {
                MType: "Weapon",
                Ability1: {
                    type: "Defense",
                    value: 2
                },
                Ability2: {
                    type: "Defense",
                    value: 1,
                },
                Damage: 10,
                Quality: "Good",
                Type: "Sword",
                Set: 0
            },
            Bags: {
                Other: 1,
                Potion: 0,
                Scroll: 0,
                Rings: 0
            },
            Container: {
                Map: {1: "Other"},
                Other: {1: {
                    MType: "Scroll",
                    Ability: "Replenish"
                }},
                Potion: {},
                Scroll: {},
                Rings: {}
            }
        }
    }
    if (id && token) {
        User.id = id,
        User.Token = token
    } else {
        async function idMaker() {
            let id = randomBytes(9).toString("hex")
            const existingUser = await mod.findOne({id:id})
            if (existingUser) { 
                id = await idMaker()
            }
            return id
        }
        User.id = await idMaker()
        User.Token = randomBytes(32).toString('hex')
    }
    return User
}



// export async function Fight(User:User, action: fightingActions, coords?:Directions) {
//     let retrunStats:FightStats = {
//         MonsterHP: 0,
//         DamageDealt: 0,
//         Crit: false,
//         Dodged: true
//     }
    
    
    
//     if (!this.FightMode) throw ErrorMgr.NotInFight
//     const stats = await this.GetStats()

//     if (action == "attack") {
//         this.FightMode.HP -= stats.Strength
//         retrunStats.DamageDealt+= stats.Strength
//         if (chance(10)) {
//             retrunStats.DamageDealt += stats.Strength * 0.2
//             retrunStats.Crit = true
//             this.FightMode.HP -= stats.Strength * 0.2
//         }
//         retrunStats.MonsterHP = this.FightMode.HP

//     } else if (action == "UseSpell") {
//         // use a spell lmfao
//     }

//     if (!chance(stats.Luck/2)) {
//         retrunStats.Dodged = false
//         this.Hp = this.FightMode
//     }

// }




