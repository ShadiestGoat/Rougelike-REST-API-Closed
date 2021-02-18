import { Tools } from "shadytools";
import { API } from "../APIinteractor";
import { User } from "../APIinteractor/types";
import { ArmorInfo, WeaponInfo } from "./ItemInfo";

export = async (tools:Tools, User:User, api:API) => {
    const stats= await api.GetUserStats()
    const FreeSpace = await api.FreeSpace()
    const MaxSpace = await api.MaxSpace()

    let fields:{name:string, value:string, inline:true}[] = [
        {
            name: "Quick Stats",
            value: `Attack: ${stats.Strength}
            Max Health: ${stats.MaxHealth}
            Max mana: ${stats.MaxMana}
            Defense: ${stats.Defense}
            Power: ${stats.Power}
            Luck: ${stats.Luck}
            Level: ${User.lvl}`,
            inline:true
        },
        {
            name: "Helmet",
            value: ArmorInfo(User.Inv.Armor.Helmet),
            inline:true
        },
        {
            name: "Bag's Free Space",
            value: `General: ${FreeSpace.Other}/${MaxSpace.Other}
            Potion: ${FreeSpace.Potion}/${MaxSpace.Potion}
            Scrolls: ${FreeSpace.Scroll}/${MaxSpace.Scroll}
            Rings: ${FreeSpace.Rings}/${MaxSpace.Rings}`,
            inline: true
        },
        {
            name: "Weapon",
            value: WeaponInfo(User.Inv.Weapon),
            inline: true
        },
        {
            name: "Chestplate",
            value: ArmorInfo(User.Inv.Armor.Chestplate),
            inline:true
        },
        {
            name: "Potion effect",
            value: User.TmpEffect ? `Moves left: ${User.TmpEffect.time}
            Type: ${User.TmpEffect.type}
            Value: (+${User.TmpEffect.value})` : "None!" ,
            inline: true
        },
        {
            name: "Necklace",
            value: ArmorInfo(User.Inv.Armor.Necklace),
            inline: true
        },
        {
            name: "Pants",
            value: ArmorInfo(User.Inv.Armor.Pants),
            inline: true
        },
        {
            name: "Ring",
            value: ArmorInfo(User.Inv.Armor.Ring),
            inline: true
        },
        {
            name: "\n",
            value: "\n",
            inline: true
        },
        {
            name: "Boots",
            value: ArmorInfo(User.Inv.Armor.Boots),
            inline: true
        },
        {
            name: "\n",
            value: "\n",
            inline: true
        }
    ]

    return tools.gembed(
        "\n",
        "Armor Information",
        undefined,
        fields
    )
}