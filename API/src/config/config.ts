import { _cnfInv_, _cnfMap_, _cnfMonster_, _cnfPotion_ } from "./configs"



export const cnfInv:_cnfInv_ = {
    Bags: {
        Other: "lvl * 9",
        Potion: "lvl * 3",
        Rings: "lvl * 3",
        Scroll: "lvl * 18"
    }
}

export const cnfMap:_cnfMap_ = {
    dimensions: 33,
    maxTunnels: 33,
    maxTunnellength: 30,

    maxMonsters: 54,
    monsterSummonChance: 15,

    maxChests: 10,
    chestChance: 7,

    roomChance: 2,
    maxRoom: 2
}

export const cnfMonster:_cnfMonster_ = {
    1: {
        Attack: 5,
        baseHP: 50,
        Defense: 15,
        Elmnt: {Fire:{Attack:20, Defense:99}, Air:{Attack: 1, Defense:99}, Earth:{Attack: 1, Defense:99}, Water:{Attack: 1, Defense:99}},
        XpGiven: 30
    },
    2: {
        Attack: 40,
        baseHP: 10,
        Defense: 30,
        Elmnt: {},
        XpGiven: 10
    },
    3: {
        Attack: 20,
        baseHP: 20,
        Defense: 10,
        Elmnt: {},
        XpGiven: 20
    },
    4: {
        Attack: 20,
        baseHP: 20,
        Defense: 10,
        Elmnt: {},
        XpGiven: 20
    },
    5: {
        Attack: 10,
        baseHP: 10,
        Defense: 5,
        Elmnt: {},
        XpGiven: 3
    }
}

export const cnfPotion:_cnfPotion_ = {
    levels: {
        Health:100,
        Defense: 22,
        Mana: 50,
        Strength: 1.5,
        Luck: 1.2,
        Poison: 75
    },
    times: {
        Defense: 5,
        Strength: 5,
        Luck: 5
    }
}