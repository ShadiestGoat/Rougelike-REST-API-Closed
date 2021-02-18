import {Document, Model, Schema, model} from "mongoose";
import {User} from "../routes/user/response"
import {_Element_, _ElmntAtDef_} from "../config/interfaces"
import { Map } from "../routes/map/response"
import { Inventory, _ench_, Armor } from "../routes/inventory/response"

export type _SH_ = User & Document

// Element --------------------------------------------




// Inventory ----------------------------------------

const EnchSH = {
    type: String,
    Elmnt: {required:false, MetaType:{
        Fire: {MetaType: {
            Attack: Number, 
            Defense: Number
        }, required: false},
        Water: {MetaType:{
            Attack: Number, 
            Defense: Number
        }, required: false},
        Air: {MetaType:{
            Attack: Number, 
            Defense: Number
        }, required: false},
        Earth: {MetaType:{
            Attack: Number, 
            Defense: Number
        }, required: false}
    }},
    value: Number
}


const ArmorSH = {
    MType: String,
    Type: String,
    Set: Number,
    Quality: String,
    Defense: Number,
    Health: Number,
    Enchantment: {required:false, MetaType:EnchSH},
    Ability1: EnchSH,
    Ability2: EnchSH
}



const InvSH = {
    Armor: {
        Helmet: ArmorSH,
        Chestplate: ArmorSH,
        Pants: ArmorSH,
        Boots: ArmorSH,
        Ring: ArmorSH,
        Necklace: ArmorSH,
    },
    Weapon: {
        MType: String,
        Ability1: EnchSH,
        Ability2: EnchSH,
        Damage: Number,
        Quality: String,
        Type: String,
        Set: Number
    },
    Container: {
        Other: Schema.Types.Mixed,
        Potion: Schema.Types.Mixed,
        Scroll: Schema.Types.Mixed,
        Rings: Schema.Types.Mixed,
        Map: Schema.Types.Mixed
    },
    Bags: {
        Other: Number,
        Potion: Number,
        Scroll: Number,
        Rings: Number
    }
}

// Final --------------------------------------------

export const SH = new Schema<_SH_>(
    {
        Token: String,
        id: {unique:true, MetaType: String},
        Name: String,
        xp: Number,
        lvl: Number,
        Hp: Number,
        BHealth: Number,
        BDefense: Number,
        Mana: Number,
        BMana: Number,
        Power: Number,
        BStrength: Number,
        BLuck: Number,
        Elmnt: {
            Fire: {MetaType: {
                Attack: Number, 
                Defense: Number
            }, required: false},
            Water: {MetaType:{
                Attack: Number, 
                Defense: Number
            }, required: false},
            Air: {MetaType:{
                Attack: Number, 
                Defense: Number
            }, required: false},
            Earth: {MetaType:{
                Attack: Number, 
                Defense: Number
            }, required: false}
        },
        Kills: Number,
        Map: {
            layout: [[String]],
            MonsterKey: Schema.Types.Mixed,
            Rooms: Schema.Types.Mixed,
            Level: Number,
            ExitCoord: [Number],
            UserPos: [Number]
        },
        Inv: InvSH,
        FightMode: Schema.Types.Mixed, 
        TmpEffect: {
            Mtype: String,
            type: String,
            value: Number
        },
        Money: Number
    },  
    { typeKey: 'MetaType' }
)


export const mod:Model<_SH_> = model<_SH_>("Users", SH)