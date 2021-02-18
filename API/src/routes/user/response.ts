import {_Element_} from "../../config/interfaces"
import { Map } from "../map/response"
import { Inventory, _effect_ } from "../inventory/response"
import { Coords } from "../map/response"
import { Monster } from "../monster/response"


export interface User {
    Token: string
    id: string
    Name: string
    xp: number,
    lvl: number,
    Hp: number
    BHealth: number
    BDefense: number
    BMana: number
    BStrength: number
    BLuck: number
    Mana: number
    Power: number
    Elmnt: _Element_
    Kills: number
    Map: Map
    Inv: Inventory
    FightMode: false | Monster
    TmpEffect?: _effect_
    Money: number,
    Checkpoints: number[]
}

export interface _userStats_ {
    MaxHealth: number,
    MaxMana: number,
    Strength: number
    Defense: number,
    Power: number,
    Luck: number,
    Elmnt: _Element_
}

export interface FightStats {
    MonsterHP: number,
    DamageDealt: number,
    Crit: boolean,
    Dodged: boolean,
    MonsterDead: boolean,
    UserDead: boolean,
    LeveledUp?:boolean
}

export type fightingActions = "attack" | "magic" | "leave"
export const fightAssrt:fightingActions[] = ["attack", "magic", "leave"]
export const fightActionRegExp = "(attack|magic|leave)"