import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Directions, Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { TextChannel, User } from "discord.js";
import UserEmbed from "../Components/UserEmbed";

interface _Args_ extends GenericArg {
    id: number
}



const command:Command = {
    name: "equip",
    desc: "Get an item id from your inventory -> equip it :D",
    group: "Inventory",
    perm: "Member",
    cooldown: 5,
    args: [{name:"id", required:true, description:"id of the item to equip", type:"INTEGER"}],
    async execute(msg, tools, _args) {
        if (!_args[0]) throw "Need to have an id!"
        const args:_Args_ = await tools.parse<_Args_>(_args, msg, ["id"])
        if (!(new RegExp(/(\d+)/).test(args.id.toString()))) {
            throw "Thats no number!"
        }
        
        const api = await D2U(msg.author.id, tools)
        const User = await api.Equip(args.id)
        await msg.author.send(await UserEmbed(tools, User))
    }
}




export = command