import {_Element_} from "./interfaces"

export interface _cnfPotion_ {
    levels: {
        Health: number;
        Defense: number;
        Mana: number;
        Strength: number;
        Luck: number;
        Poison: number;
    },
    times: {
        Defense: number;
        Strength: number;
        Luck: number;
    }
}

export interface _cnfMonster_ {
    [key:string]: {
        
    }
    [key:number]: {
        baseHP: number,
        Attack: number,
        XpGiven: number,
        Defense: number,
        Elmnt: _Element_,
    }
}

export interface _cnfMap_ {
    dimensions: number,
    maxTunnels: number,
    maxTunnellength: number,
    monsterSummonChance: number,
    maxMonsters: number,
    maxChests: number,
    chestChance: number,
    roomChance: number,
    maxRoom: number
}

export interface _cnfInv_ {
    Bags: {
        Other: string,
        Potion: string,
        Rings: string
        Scroll: string,
    }
}