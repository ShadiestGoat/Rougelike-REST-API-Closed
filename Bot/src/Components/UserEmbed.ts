import {Tools} from "shadytools"
import { API } from "../APIinteractor"
import { User } from "../APIinteractor/types"

export = async (tools:Tools, User:User) => {
    const api = new API(User.id, User.Token, tools)
    const stats = await api.GetUserStats()
    let effect = "None!"
    if (User.TmpEffect != undefined) {
        effect = `${User.TmpEffect.type} (+${User.TmpEffect.value})\n${User.TmpEffect.time} moves left!`
    }
    return tools.gembed(
        `${User.Name}.userStats()`,
        "Your user stats",
        undefined,
        [
            {
                name: "Health",
                value: `${User.Hp}/${stats.MaxHealth}`,
                inline: true
            },
            {
                name: "Mana",
                value: `${User.Mana}/${stats.MaxMana}`,
                inline: true
            },
            {
                name: "Money",
                value: `${User.Money}`,
                inline: true
              },
              {
                name: "Attack",
                value: `${stats.Strength}`,
                inline: true
              },
              {
                name: "Potion Effect",
                value: effect,
                inline: true
              },
              {
                name: "Defense",
                value: `${stats.Defense}`,
                inline: true
              },
              {
                name: "Elements",
                value: "Fire\nWater\nAir\nEarth",
                inline: true
              },
              {
                name: "Element Attack",
                value: `${stats.Elmnt.Fire?.Attack || 0}\n${stats.Elmnt.Water?.Attack || 0}\n${stats.Elmnt.Air?.Attack || 0}\n${stats.Elmnt.Earth?.Attack || 0}`,
                inline: true
              },
              {
                name: "Element Defense",
                value: `${stats.Elmnt.Fire?.Defense || 0}\n${stats.Elmnt.Water?.Defense || 0}\n${stats.Elmnt.Air?.Defense || 0}\n${stats.Elmnt.Earth?.Defense || 0}`,
                inline: true
              }
        ]
    )
}