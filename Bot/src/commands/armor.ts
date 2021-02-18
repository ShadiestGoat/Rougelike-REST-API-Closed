import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import userEmbed from "../Components/UserEmbed"
import { D2U } from "../toolsForBot"
import EquipedEmbed from "../Components/EquipedEmbed"

interface _Args_ extends GenericArg {
}



const command:Command = {
    name: "armor",
    desc: "Shows your armor and some quick stats",
    group: "Inventory",
    perm: "Member",
    cooldown: 5,
    args: [],
    async execute(msg, tools, _args) {
        const args:_Args_ = await tools.parse<_Args_>(_args, msg, [])
        const api = await D2U(msg.author.id, tools)
        await msg.author.send(await EquipedEmbed(tools, await api.GetUser(), api))
    }
}


export = command