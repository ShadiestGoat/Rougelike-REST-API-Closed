export interface _Element_ {
    Fire?: _ElmntAtDef_,
    Water?: _ElmntAtDef_,
    Air?: _ElmntAtDef_,
    Earth?: _ElmntAtDef_
}
export interface _ElmntAtDef_ {
    Attack: number, 
    Defense:number
}

// Err

export interface error {
    error: string
}

// User

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


export interface UserStats {
    MaxHealth: number,
    MaxMana: number,
    Strength: number
    Defense: number,
    Power: number,
    Luck: number,
    Elmnt: _Element_
}

// Map

export type Directions = "up" | "down" | "left" | "right"
export type Coords = [number, number]

export type TileType = 
        "▢" | 
        "▩" | 
        "△" |
        "▷" | 
        "▣" | 
        "◈" |
        "◆" |
        "◧"
        
export interface Map {
    layout: TileType[][],
    ExitCoord: Coords,
    Level: number,
    MonsterKey: {
        [key:string]: number
    },
    Rooms: {
        [key:string]: boolean
    },
    UserPos: Coords,
    NPCs: {
        [key:string]: number
    }
    NextLevel?: number 
}


// Inv


export interface Inventory {
    Armor: {
        Helmet: Armor,
        Chestplate: Armor,
        Pants: Armor,
        Boots: Armor,
        Ring: Armor,
        Necklace: Armor,
    }
    Weapon: _weapon_,
    Container: {
        Other: {[key: number]: Item},
        Potion: {[key: number]: Potion},
        Scroll: {[key: number]: Scroll},
        Rings: {[key: number]: Armor},
        Map: {[key: number]: keyof Bags}
    }
    Bags: Bags
}


export type Item = Potion | Scroll | _weapon_ | Armor
export type ArmorType = "Helmet" | "Chestplate" | "Pants" | "Boots" | "Ring" | "Necklace"

interface _Item {
    Enchantment?: _ench_
    Ability1: _ench_
    Ability2: _ench_
    Quality: "Good" | "Bad"
}

export interface Armor extends _Item {
    MType: "Armor"
    Type: ArmorType
    Set: number
    Defense: number
    Health: number

}

export interface Scroll {
    MType: "Scroll"
    Ability: "Mine" | "Teleport" | "Replenish"
}

export interface _weapon_ extends _Item{
    MType: "Weapon"
    Type:   "Sword" | 
            "Dagger" | 
            "Blunt" |
            "Ranged" |
            "Staff"
    Set: number
    Damage: number,
}

export interface Potion {
    MType: "Potion"
    Effect: "Health" |
            "Defense" |
            "Mana" |
            "Strength" |
            "Luck" |
            "Poison"
    Time: number
    Permanent: boolean
    Level: number
}


export interface _effect_ {
    MType: "Effect"
    type: "Health" |
        "Defense" |
        "Mana" |
        "Strength" |
        "Luck" |
        "Poison"
    value: number
    time: number
}

export interface _ench_ {
    type: "MaxHealth" |
          "MaxMana" |
          "Strength" |
          "Defense" |
          "Power" |
          "Luck" | 
          "Elmnt",
    Elmnt?: _Element_
    value: number
}


export type Bags = {
    Other: number,
    Potion: number,
    Scroll: number,
    Rings: number
}



// Monster


export interface FightStats {
    MonsterHP: number,
    DamageDealt: number,
    Crit: boolean,
    Dodged: boolean,
    MonsterDead: boolean,
    UserDead: boolean,
    LeveledUp?:boolean
}

export interface Monster {
    Type: number
    Level: number
    MaxHealth: number
    HP: number
    ExpGiven: number,
    MoneyGiven: number,
    Elmnt: _Element_
    Attack: number
    Defense: number
}

