import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U, dirchoices } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Directions, Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { TextChannel } from "discord.js";

interface _Args_ extends GenericArg {
    dir: Directions
}



const command:Command = {
    name: "cd",
    desc: "This is the command to go up a map level, be warned everything gets harder, but the loot also increases in value, so worth it!",
    group: "Map",
    perm: "Member",
    cooldown: 5,
    args: [{name:"dir", required:true, description:"direction where you wanna move", type:"STRING", choices: dirchoices }],
    async execute(msg, tools, _args) {
        if (!_args[0]) throw "Need to have a direction!"
        const args:_Args_ = await tools.parse<_Args_>(_args, msg, ["dir"])
        if (!(new RegExp(/(up|down|left|right)/).test(args.dir))) {
            throw "Thats not a direction!"
        }
        const api = await D2U(msg.author.id, tools)
        const files = (await import('../config/msg')).FileNames
        await api.Up(args.dir)
        await msg.author.send(tools.gembed(
            `${(await api.GetUser()).Name} as the new folders load, you look around. As you are looking for a new sym link to go even further up, you read some files... ${tools.random(0, files.length - 1)}, ${tools.random(0, files.length - 1)}, ${tools.random(0, files.length - 1)}... Nope. nothing intresting once again...`,
            "You changed directory, to one above"
        ))
        await msg.author.send(await api.DisplayMap())
    }
}




export = command