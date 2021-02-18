import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { TextChannel } from "discord.js";

interface _Args_ extends GenericArg {
}



const command:Command = {
    name: "inventory",
    desc: "Shows your iventory",
    group: "Inventory",
    perm: "Member",
    cooldown: 5,
    args: [],
    async execute(msg, tools, _args) {
        const args:_Args_ = await tools.parse<_Args_>(_args, msg, [])
        const api = await D2U(msg.author.id, tools)
        const thing = await InvEmbed(tools, await api.GetUser())
        await thing.setAuthorizedUsers([msg.author.id])
                   .setPageIndicator(true)
                   .setChannel(msg.channel as TextChannel)
                   .build()
    }
}




export = command