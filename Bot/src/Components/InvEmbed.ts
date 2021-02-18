import {Tools} from "shadytools"
import { API } from "../APIinteractor"
import { Item, Potion, Scroll, User, _weapon_ } from "../APIinteractor/types"
import "./ItemInfo"
import { PotionInfo, ArmorInfo, ScrollInfo } from "./ItemInfo"
import { Embeds } from "discord-paginationembed"


export = async (tools:Tools, User:User) => {
    const WeaponInfo = (await import('./ItemInfo')).WeaponInfo
    
    const api = new API(User.id, User.Token, tools)
      
    let OtherItems: Item[] = [];
    let cc:number = 0; 
    let Mmap = {}
    for (var id in User.Inv.Container.Other) {
        OtherItems.push(User.Inv.Container.Other[id])
        Mmap[cc] = id
        cc++
    }
    OtherItems.sort((a, b) => {return a.MType.localeCompare(b.MType)})
    let counter = 0;
    let Mcounter = 0;
    let embedArray = []
    let fields:{name:string, value:string, inline:boolean}[] = [];

    for (let Item of OtherItems) {
        if (counter==9) {
            embedArray.push(tools.gembed(
                `${User.Name}.inventory.General`,
                "Your items",
                undefined,
                fields
            ))
            fields = []
            counter = 0          
        }

        // I cant use eval() since typescript dumb
        switch (Item.MType) {
            case "Armor":
                fields.push({
                    name:Item.MType,
                    value: ArmorInfo(Item, Mmap[Mcounter]),
                    inline:true
                })
                break
            case "Potion":
                fields.push({
                    name:Item.MType,
                    value: PotionInfo(Item as Potion, Mmap[Mcounter]),
                    inline:true
                })
                break
            case "Scroll":
                fields.push({
                    name:Item.MType,
                    value: ScrollInfo(Item as Scroll, Mmap[Mcounter]),
                    inline:true
                })
                break
            case "Weapon":
                fields.push({
                    name:Item.MType,
                    value: WeaponInfo(Item as _weapon_, Mmap[Mcounter]),
                    inline:true
                })
                break
    
        }
    
        counter++;
        Mcounter++;
    }
    if (fields.length) {
        embedArray.push(tools.gembed(
            `${User.Name}.inventory.General`,
            "Your items",
            undefined,
            fields
        ))
    } 
    counter = 0;
    fields = []
    for (let Potion in User.Inv.Container.Potion) {
        if (counter==9) {
            embedArray.push(tools.gembed(
                `${User.Name}.inventory.Potions`,
                "Your potions",
                undefined,
                fields
            ))
            fields = []
            counter = 0          
        }
        fields.push({
            name: "Potion",
            value: PotionInfo(User.Inv.Container.Potion[parseInt(Potion)], parseInt(Potion)),
            inline:true
        })
        counter++;
        Mcounter++;
    }
    counter = 0;
    fields = []
    for (let Scroll in User.Inv.Container.Scroll) {
        if (counter==9) {
            embedArray.push(tools.gembed(
                `${User.Name}.inventory.Scrolls`,
                "Your scrolls",
                undefined,
                fields
            ))
            fields = []
            counter = 0          
        }
        fields.push({
            name: "Scroll",
            value: ScrollInfo(User.Inv.Container.Scroll[parseInt(Scroll)], parseInt(Scroll)),
            inline:true
        })
        counter++;
        Mcounter++;
    }
    if (fields.length) {
        embedArray.push(tools.gembed(
            `${User.Name}.inventory.Scrolls`,
            "Your scrolls",
            undefined,
            fields
        ))
    } 
    counter = 0;
    fields = []
    for (let Ring in User.Inv.Container.Scroll) {
        if (counter==9) {
            embedArray.push(tools.gembed(
                `${User.Name}.inventory.Rings`,
                "Your scrolls",
                undefined,
                fields
            ))
            fields = []
            counter = 0          
        }
        fields.push({
            name: "Ring",
            value: ArmorInfo(User.Inv.Container.Rings[parseInt(Ring)], parseInt(Ring)),
            inline:true
        })
        counter++;
        Mcounter++;
    }
    if (fields.length) {
        embedArray.push(tools.gembed(
            `${User.Name}.inventory.Rings`,
            "Your scrolls",
            undefined,
            fields
        ))
    }
    
    if (!embedArray) throw "Empty inventory!"


    return new Embeds().setArray(embedArray)


}