import {Coords, Map, TileType, Walkable, Directions} from "./response"
import {chance, dir2coords, randInt} from "../tools"
import {_cnfMap_, _cnfMonster_} from "../../config/configs"
import { UpdateUser } from "../tools"
import { Armor, Item, Potion, _effect_, Scroll, _weapon_, ArmorList, _Item, EnchTypes } from "../inventory/response"
import { User } from "../user/response"
import { GetStats } from "../user/handler"
import { elmnts } from "../../config/interfaces"
import { FreeSpace } from "../inventory/handler"



function _PoppulateMonster(gen:Map, coord:Coords, monsterslength:number, conf:_cnfMonster_) {
    gen.layout[coord[0]][coord[1]] = '△'
    gen.MonsterKey[coord.toString()] = parseInt(Object.keys(conf).sort((a, b) => {return parseInt(b)-parseInt(a)})[0])
    monsterslength++
    return {gen:gen, m:monsterslength}
}


export async function Generate(level:number):Promise<Map> {
    if ((level -1)%15 === 0 && level!==1) {
        return await GenCalmRoom(level)
    }
    
    let gen:Map = {
        layout: undefined,
        ExitCoord: [0, 0],
        Level: level,
        MonsterKey: {},
        Rooms: {},
        UserPos: [0, 0],
        NPCs: {}
    }
    let settings:_cnfMap_ = require('../../config/config').cnfMap
    var Empty:Coords[] = []
    let dimensions = settings.dimensions,
        maxTunnels = settings.maxTunnels,
        maxLength = settings.maxTunnellength
        
    let map:Array<Array<TileType>> = [];

    for (var i = 0; i < dimensions; i++) {
        map.push([]);
        for (var j = 0; j < dimensions; j++) {
            map[i].push("▩");
        }
    }
    
    let currentRow = randInt(0, dimensions), 
        currentColumn = randInt(0, dimensions), 
        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]], 
        lastDirection = [], 
        randomDirection = directions[randInt(0, directions.length - 1)]

    
        
    while (maxTunnels && dimensions && maxLength) {
        do randomDirection = directions[randInt(0, directions.length - 1)] 
        while (
            (randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || 
            (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1])
        )
        var randomLength = Math.ceil(Math.random() * maxLength)
        var tunnelLength = 0; 
        while (tunnelLength < randomLength) {
            if (((currentRow === 0) && (randomDirection[0] === -1)) ||
                ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
                ((currentColumn === 0) && (randomDirection[1] === -1)) ||
                ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
            break;
            
            } else {
                
                map[currentRow][currentColumn] = "▢"; 

                Empty.push([currentRow, currentColumn])

                currentRow += randomDirection[0];
                currentColumn += randomDirection[1];
                    tunnelLength++
                }
            }
      
            if (tunnelLength) { 
              lastDirection = randomDirection
              maxTunnels--
            }
    }

    gen.layout = map
    
    let monsterslength:number = 0,
        chestlength:number = 0,
        roomlength:number = 0
    
    const conf:_cnfMonster_ = require('../../config/config').cnfMonster

    for (var coord of Empty) {
        // room
        if (chance(settings.roomChance)) {
            if (roomlength = settings.maxRoom) continue
            if (!SpawnWalks(coord, gen, settings)) continue
            
            gen.layout[coord[0]][coord[1]] = "▷"
            gen.Rooms[coord.toString()] = false
            roomlength++

            if (coord[0] != settings.dimensions - 1) {
                if (Walkable.includes(gen.layout[coord[0] + 1][coord[1]])) {
                    const M = _PoppulateMonster(gen, [coord[0] + 1, coord[1]], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                }
            }
            if (coord[0] != 0) {
                if (Walkable.includes(gen.layout[coord[0] - 1][coord[1]])) {
                    const M = _PoppulateMonster(gen, [coord[0] - 1, coord[1]], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                } 
            }
            if (coord[1] == settings.dimensions - 1) {
                if (Walkable.includes(gen.layout[coord[0]][coord[1] + 1])) {
                    const M = _PoppulateMonster(gen, [coord[0], coord[1] + 1], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                }
            }
            if (coord[1] == 0) {
                if (Walkable.includes(gen.layout[coord[0]][coord[1] - 1])) {
                    const M = _PoppulateMonster(gen, [coord[0], coord[1] - 1], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                }
            }

        // chest
        } else if (chance(settings.chestChance)) {
            if (chestlength > settings.maxChests) continue
            if (!SpawnWalks(coord, gen, settings)) continue
            
            gen.layout[coord[0]][coord[1]] = "▣"
            chestlength++

            if (coord[0] != 0) {
                if (Walkable.includes(gen.layout[coord[0] - 1][coord[1]])) {
                    const M = _PoppulateMonster(gen, [coord[0] - 1, coord[1]], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                }
            }
            if (coord[0] != settings.dimensions - 1) {
                if (Walkable.includes(gen.layout[coord[0] + 1][coord[1]])) {
                    const M = _PoppulateMonster(gen, [coord[0] + 1, coord[1]], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                }
            }
            if (coord[1] != settings.dimensions - 1) {
                if (Walkable.includes(gen.layout[coord[0]][coord[1] + 1])) {
                    const M = _PoppulateMonster(gen, [coord[0], coord[1] + 1], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                }
            }
            if (coord[1] != 0) {
                if (Walkable.includes(gen.layout[coord[0]][coord[1] - 1])) {
                    const M = _PoppulateMonster(gen, [coord[0], coord[1] - 1], monsterslength, conf)                    
                    gen = M.gen
                    monsterslength = M.m
                }
            }
                // monster
        } else if (chance(settings.monsterSummonChance)) {
            if (monsterslength > settings.maxMonsters) continue
                gen.layout[coord[0]][coord[1]] = '△'
                gen.MonsterKey[coord.toString()] = parseInt(Object.keys(conf).sort((a, b) => {return parseInt(b)-parseInt(a)})[0])
                monsterslength++
        } else if (chance(0.3)) {
            if (!SpawnWalks(coord, gen, settings)) continue
            gen.layout[coord[0]][coord[1]] = '◧'
            if (chance(10)) {
                gen.NPCs[coord.toString()] = randInt(0, 3)
            } else {
                gen.NPCs[coord.toString()] = randInt(4, 7)
            }
            // NPC
            // 0 - Shopkeeper
            // 1 - Witch
            // 2 - Enchanter
            // 3 - Upgrader  (1.25 * Attack/Defense, make quality 'good')
            // 4 - 7 = dialog npc :D
        }
        if (!(Walkable.includes(gen.layout[coord[0]][coord[1]]))) {
            Empty.splice(Empty.indexOf(coord), 1)
        }
    }


    function ExitMaker3000(gen:Map, settings:_cnfMap_, empty:Coords[]) {
        const coord = empty[randInt(0, empty.length-1)]
        if (!SpawnWalks(coord, gen, settings)) ExitMaker3000(gen, settings, empty)
        return coord
    }

    gen.ExitCoord = ExitMaker3000(gen, settings, Empty)
    gen.layout[gen.ExitCoord[0]][gen.ExitCoord[1]] = "◆"


    gen.UserPos = Empty[randInt(0, Empty.length-1)]
    gen.layout[gen.UserPos[0]][gen.UserPos[1]] = "◈"

    return gen
}
 
function SpawnWalks(coords: Coords, gen:Map, settings:_cnfMap_) {
    const x = coords[0]
    const y = coords[1]
    var stat1 = true
    var stat2 = true
    // vertical walkability
    if (x == 0 || x == settings.dimensions - 1 || y == 0 || y == settings.dimensions - 1) {stat1 = false} else 
        if (Walkable.includes(gen.layout[x + 1][y]) && gen.layout[x - 1][y]) {
        
            if (!(
                (Walkable.includes(gen.layout[x][y + 1]) && Walkable.includes(gen.layout[x + 1][y + 1]) && Walkable.includes(gen.layout[x - 1][y + 1])) ||
                (Walkable.includes(gen.layout[x][y - 1]) && Walkable.includes(gen.layout[x + 1][y - 1]) && Walkable.includes(gen.layout[x - 1][y - 1]))
            )) {
                stat1 = false
            }
    
        }
    
    // horizontal
    if (x == 0 || x == settings.dimensions - 1 || y == 0 || y == settings.dimensions - 1) {stat2 = false} else 
    if (Walkable.includes(gen.layout[x][y + 1]) && gen.layout[x][y - 1]) {
        if (!(
            (Walkable.includes(gen.layout[x + 1][y]) && Walkable.includes(gen.layout[x + 1][y + 1]) && Walkable.includes(gen.layout[x + 1][y - 1])) ||
            (Walkable.includes(gen.layout[x - 1][y]) && Walkable.includes(gen.layout[x - 1][y + 1]) && Walkable.includes(gen.layout[x - 1][y - 1]))
        )) {
            stat2 = false
        }
    }

    if (stat1 && stat2) {
        return true
    } else {
        return false
    }
    
}

export async function Move(direction:Directions, _amount:number, map:Map, User:User):Promise<User> {
    if (User.FightMode) throw "In a fight"
    
    let amount:Coords = [0, 0]
    // first transform the direction parameter to an actually readable number
    switch(direction) {
        case "up":
            amount[0] -= _amount 
            break
        case "down":
            amount[0] += _amount
            break        
        case "left":
            amount[1] -= _amount
            break
        case "right":
            amount[1] += _amount
            break
    }

    // make sure that we arent going into out of bounds
    // since map.layout is always a square, we can get away with doing map.layout.length for both the x & y
    try {
        if (map.layout.length <= map.UserPos[0] + amount[0] || map.layout.length <= map.UserPos[1] + amount[1] || map.UserPos[1] + amount[1] < 0 || map.UserPos[0] + amount[0] < 0 ) throw "Not Empty Tile"
    } catch (err) {
        throw "Not Empty Tile"
    }
    if (_amount == 1) {
        if (map.layout[map.UserPos[0] + amount[0]][map.UserPos[1] + amount[1]] != "▢") {throw "Not Empty Tile"}
    } else {
        console.log((amount[0] ? amount[0] : amount[1]) + 1)
        for (var i = 1; i < Math.abs(amount[0] ? amount[0] : amount[1]) + 1; i++) {
            if ((amount[0] ? amount[0] : amount[1]) < 0) {
                if (map.layout[map.UserPos[0] + (amount[0] ? -i : 0)][map.UserPos[1] + (amount[1] ? -i : 0)] != "▢") {throw "Not Empty Tile"}
            } else {
                if (map.layout[map.UserPos[0] + (amount[0] ? i : 0)][map.UserPos[1] + (amount[1] ? i : 0)] != "▢") {throw "Not Empty Tile"}
            }
            if (User.TmpEffect) {
                User.TmpEffect.time--
                if (User.TmpEffect.time == 0) {
                    User.TmpEffect = undefined
                } 
            }
        }
    }
    map.layout[map.UserPos[0]][User.Map.UserPos[1]] = "▢"
    map.UserPos = [User.Map.UserPos[0] + amount[0], User.Map.UserPos[1] + amount[1]]
    map.layout[map.UserPos[0]][map.UserPos[1]] = "◈"
    User.Map = map
    await UpdateUser(User)
    return User
}


export async function GenCalmRoom(nextLevel:number):Promise<Map> {
    const map:Map = {
        ExitCoord: [3, 9],
        Level: 0,
        MonsterKey: {},
        Rooms: {},
        UserPos: [15,9],
            layout: [
                ["▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩"],
                ["▩", "▩", "▩", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▩", "▩", "▩"],
                ["▩", "▩", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▩", "▩"],
                ["▩", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "◆", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▩"],
                ["▩", "▢", "▢", "▢", "▣", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▣", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▢", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "◧", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▢", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩"],
                ["▩", "▢", "▢", "▢", "▣", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▣", "▢", "▢", "▢", "▩"],
                ["▩", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "◈", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▩"],
                ["▩", "▩", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▩", "▩"],
                ["▩", "▩", "▩", "▩", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▢", "▩", "▩", "▩", "▩"],
                ["▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩", "▩"],
            ],
        NPCs: {
            "9,9": 0,
        },
        NextLevel: nextLevel
    }
    return map
}

export async function OpenChest(User:User, Dir:Directions):Promise<Item> {
    const ChestCoords = await dir2coords(User.Map.UserPos, Dir)
    if (User.Map.layout[ChestCoords[0]][ChestCoords[1]] != "▣") throw "Not a Chest"
    let Item:Item
    const ItemType = randInt(0, 4)
    const stats = await GetStats(User)
    switch(ItemType) {
        case 0:
            let pe = false
            if (chance(1 + stats.Luck/150)) {
                pe = true
            }
            type effects_ = "Health" | "Defense"| "Mana"| "Strength"| "Luck"
            const effects:effects_[] = ["Health", "Defense", "Mana", "Strength", "Luck"];

            (Item as Potion) = {
                MType: "Potion",
                Level: randInt(1,4),
                Time: randInt(1, 35),
                Effect: effects[randInt(0, 4)],
                Permanent: pe
            }         
            break
        case 1:
            let Ability:"Mine" | "Teleport" | "Replenish";

            if (chance(0.5 + stats.Luck/10)) {
                Ability = "Replenish"
            } else if (chance(70)) {
                Ability = "Mine"
            } else {
                Ability = "Teleport"
            };
            (Item as Scroll) = {
                MType: "Scroll",
                Ability: Ability
            }
            break
        case 2:
            Item = await AbiltityGen<_weapon_>(({
                MType:"Weapon", 
                Type:"Sword", 
                Set:randInt(0, 50),
                Quality: chance(5) ? "Good" : "Bad",
                Damage: Math.round(User.lvl * (stats.Power + User.Map.Level + stats.Luck))
            } as _weapon_), User)
            break
        case 3:
            Item = await AbiltityGen<Armor>(({
                MType: "Armor",
                Health: Math.round(User.lvl * (stats.Power + User.Map.Level + stats.Luck) + 50),
                Defense: Math.round(User.lvl * (stats.Power + User.Map.Level + stats.Luck) + 100),
                Quality: chance(5) ? "Good" : "Bad",
                Set: randInt(0, 50),
                Type: ArmorList[randInt(0, ArmorList.length-1)]
            } as Armor), User) 
            break
    }
    const latestId = parseInt(Object.keys(User.Inv.Container.Map ? User.Inv.Container.Map : {}).sort((a, b) => {return parseInt(b)-parseInt(a)})[0])
    const free = await FreeSpace(User)
    
    let TypeThing:"Potion" | "Other" | "Scroll" | "Rings" = "Other"

    if (Item.MType == "Scroll") {
        TypeThing = "Scroll"
    } else if (Item.MType == "Armor") {
        if (Item.Type == "Ring") {
            TypeThing = "Rings"
        }
    } else if (Item.MType == "Potion") {
        TypeThing = "Potion"
    }
    if (free[TypeThing] != 0) {
        User.Inv.Container.Map[latestId] = TypeThing
        User.Inv.Container[TypeThing][latestId] = Item      
    } else if (free.Other != 0) {
        User.Inv.Container.Map[latestId] = "Other"
        User.Inv.Container.Other[latestId] = Item      
    } else {
        throw "Full Inv!"
    }
    User.Map.layout[ChestCoords[0]][ChestCoords[1]] = "▢"

    await UpdateUser(User)
    return Item
}

async function AbiltityGen<T extends _Item>(Item: T, User:User):Promise<T> {
    const stats = await GetStats(User)
    const EnchTypesList:EnchTypes[] = ["Defense", "Elmnt", "Luck", "MaxHealth", "MaxMana", "Power", "Strength"]
    const ab1 = EnchTypesList[randInt(0, EnchTypesList.length-1)]
    let elmnt = {};
    if (ab1 == "Elmnt") {
        elmnt[elmnts[randInt(0, 3)]] = {Attack: Math.round((User.lvl * (stats.Power + User.Map.Level + stats.Luck))/4), Defense: Math.round((User.lvl * (stats.Power + User.Map.Level + stats.Luck))/4)}
    }
    const ab2 = EnchTypesList[randInt(0, EnchTypesList.length-1)]
    let elmnt2 = {};
    if (ab2 == "Elmnt") {
        elmnt2[elmnts[randInt(0, 3)]] = {Attack: Math.round((User.lvl * (stats.Power + User.Map.Level + stats.Luck))/4), Defense: Math.round((User.lvl * (stats.Power + User.Map.Level + stats.Luck))/4)}
    }

    Item.Ability1 = {
        type: ab1,
        value: Math.round(User.lvl * (stats.Power + User.Map.Level + stats.Luck)),
        Elmnt: elmnt,
    }
    Item.Ability2 = {
        type: ab2,
        value: Math.round(User.lvl * (stats.Power + User.Map.Level + stats.Luck)),
        Elmnt: elmnt
    }
    return Item
}