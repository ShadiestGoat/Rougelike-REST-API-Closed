import { Tools } from "shadytools";
import { _msg_ } from "shadytools/src/Config";
import { API } from "../APIinteractor";
import { User } from "../APIinteractor/types";
import { Monster } from "../APIinteractor/types";
import MNames from "../config/names"
import { mod } from "../models/DUser";

export = async function(tools:Tools, User:User, Monster:Monster) {
    return tools.gembed(
        "What a showdown!",
        `${MNames[Monster.Type]} VS ${User.Name}`,
        undefined,
        [
            {
                name: "Health",
                value: `${Monster.HP}/${Monster.MaxHealth}`,
                inline: true
            },
            {
                name: "Strength : Defense",
                value: Monster.Attack.toString() + " : " + Monster.Defense.toString(),
                inline: true
            },
            {
                name: "Reward",
                value: `${Monster.ExpGiven} xp + ${Monster.MoneyGiven} money`,
                inline: true
            },
            {
                name: "Elements",
                value: "Fire\nWater\nAir\nEarth",
                inline: true
            },
            {
                name: "Element Attack",
                value: `${Monster.Elmnt.Fire?.Attack || 0}\n${Monster.Elmnt.Water?.Attack || 0}\n${Monster.Elmnt.Air?.Attack || 0}\n${Monster.Elmnt.Earth?.Attack || 0}`,
                inline: true
            },
            {
                name: "Element Defense",
                value: `${Monster.Elmnt.Fire?.Defense || 0}\n${Monster.Elmnt.Water?.Defense || 0}\n${Monster.Elmnt.Air?.Defense || 0}\n${Monster.Elmnt.Earth?.Defense || 0}`,
                inline: true
            }
        ]
    )    
}




