import {_Element_} from "../../config/interfaces"



export type Item = Potion | Scroll | _weapon_ | Armor

export type ArmorType = "Helmet" | "Chestplate" | "Pants" | "Boots" | "Ring" | "Necklace"
export const ArmorList = ["Helmet", "Chestplate", "Pants", "Boots", "Ring", "Necklace"]

export type Quality = "Good" | "Bad"

export interface _Item {
    Enchantment?: _ench_
    Ability1: _ench_
    Ability2: _ench_
    Quality: Quality
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
export type EnchTypes = "MaxHealth" |
"MaxMana" |
"Strength" |
"Defense" |
"Power" |
"Luck" | 
"Elmnt"

export interface _ench_ {
    type: EnchTypes
    Elmnt?: _Element_
    value: number
}


export type Bags = {
    Other: number,
    Potion: number,
    Scroll: number,
    Rings: number
}

export interface Inventory {
    Armor: {
        Helmet: Armor,
        Chestplate: Armor,
        Pants: Armor,
        Boots: Armor,
        Ring: Armor,
        Necklace: Armor
    },
    Weapon:_weapon_,
    Container: {
        Other: {[key: number]: Item},
        Potion: {[key: number]: Potion},
        Scroll: {[key: number]: Item},
        Rings: {[key: number]: Armor},
        Map: {[key: number]: keyof Bags}
    }
    Bags: Bags
}