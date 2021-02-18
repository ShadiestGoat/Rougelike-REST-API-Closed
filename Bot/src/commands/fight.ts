import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U, dirchoices } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Directions, Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { TextChannel } from "discord.js";
import MonsterInfo from "../Components/MonsterInfo";
import UserEmbed from "../Components/UserEmbed";

interface _Args_ extends GenericArg {
    dir: Directions
}



const command:Command = {
    name: "fight",
    desc: "pick a fight with a bug, but be warned, they will fight back!",
    group: "Monster",
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
        await api.FightMonster(args.dir)
        const User = await api.GetUser()
        if (!User.FightMode) throw "how is this possible??!?!??!?"
        // i need to make ts happy :)
        await msg.author.send(tools.gembed(`You decide to attack the bug. Turns out, it is a ${(await import('../config/msg'))[User.FightMode.Type]}, and it is *mad*. It wasnt to fight back, but, due to you being superior, you still have a chance to fight!`))
        await msg.author.send(await MonsterInfo(tools, User, User.FightMode))
    }
}




export = command