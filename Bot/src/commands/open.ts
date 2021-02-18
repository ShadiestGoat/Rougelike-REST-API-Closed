import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U, dirchoices } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Directions, Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { MessageEmbed, TextChannel } from "discord.js";
import { ArmorInfo, PotionInfo, ScrollInfo, WeaponInfo } from "../Components/ItemInfo";

interface _Args_ extends GenericArg {
    dir: Directions
}



const command:Command = {
    name: "open",
    desc: "opens a chest in the direction specified",
    group: "Map",
    perm: "Member",
    cooldown: 5,
    args: [{name:"dir", required:true, description:"direction where you wanna move", type:"STRING", choices: dirchoices}],
    async execute(msg, tools, _args) {
        if (!_args[0]) throw "Need to have a direction!"
        const args:_Args_ = await tools.parse<_Args_>(_args, msg, ["dir"])
        if (!(new RegExp(/(up|down|left|right)/).test(args.dir))) {
            throw "Thats not a direction!"
        }
        const api = await D2U(msg.author.id, tools)
        const resp = await api.Open(args.dir)
        let e:MessageEmbed;
        switch (resp.MType) {
            case "Scroll":
                e = tools.gembed(
                    ScrollInfo(resp),
                    "Scroll found!"
                )
                break
            case "Weapon":
                e = tools.gembed(
                    WeaponInfo(resp),
                    "Weapon found!"
                )
                break
            case "Armor":
                e = tools.gembed(
                    ArmorInfo(resp),
                    "Armor found!"
                )
                break
            case "Potion":
                e = tools.gembed(
                    PotionInfo(resp),
                    "Potion found!"
                )

        }

        await msg.author.send(tools.gembed(`You walk up to the chest. The golden surface shows your tired, sleep deprived face. ${tools.random(0, 1) == 1 ? "You reflect a bit on what got you here. I mean, surely it wasn't just to test out some random bot, right? Why me? Why now?" : "You are in a hurry, you can't stop to reflect. You must find a way out of here... then maybe talk to people..."} Regardless, you decide to open the chest, and surpriiise! you found a ${resp.MType.toLowerCase()}. You hold it above your head, imagining a weird low bit trumpet sounds`, "A chest?"))
        await msg.author.send(e)

    }
}




export = command