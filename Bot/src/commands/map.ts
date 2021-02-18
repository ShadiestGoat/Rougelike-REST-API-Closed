import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { TextChannel } from "discord.js";



const command:Command = {
    name: "ls",
    desc: "Shows the map youre on",
    group: "Map",
    perm: "Member",
    cooldown: 5,
    args: [],
    async execute(msg, tools, _args) {
        const api = await D2U(msg.author.id, tools)
        await msg.author.send(tools.gembed('You open up the terminal, greeted with a nice neofetch you setup... Typing in ls you get a list of folders & files neatly arranged in rows & columns, some of which you can hop on, some of which are locked off (sudo?). Some you see are corrupted. You notice some chests denoted by ▣. Could some of them be zip bombs? You can\'t afford to not risk it, can you? You search through the files, trying to find any sort of clues on why youre here, but to no avail.' + (tools.random(0, 100) == 0 ? "Weirdly, you see some folders marked 'PersonalProject'. What could it mean?" : ""), 'ls'))
        await msg.author.send(await api.DisplayMap())
    }
}




export = command