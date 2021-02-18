import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U, dirchoices } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Directions, Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { TextChannel } from "discord.js";

interface _Args_ extends GenericArg {
    dir: Directions
    amount: number
}



const command:Command = {
    name: "move",
    desc: "Moves in the {dir} direction",
    group: "Map",
    perm: "Member",
    cooldown: 5,
    args: [{name:"dir", required:true, description:"direction where you wanna move", type:"STRING", choices: dirchoices},  {name:"amount", required: false, type:"INTEGER", description: "the amount you want to move", defaultValue: "1"}],
    async execute(msg, tools, _args) {
        if (!_args[0]) throw "Need to have a direction!"
        if (!_args[1]) _args[1] = "1"
        const args:_Args_ = await tools.parse<_Args_>(_args, msg, ["dir", "amount"])
        if (!(new RegExp(/(up|down|left|right)/).test(args.dir))) {
            throw "Thats not a direction!"
        }
        if (!(new RegExp(/\d+/).test(args.amount.toString()))) throw "Amount must be a number!"
        const api = await D2U(msg.author.id, tools)
        await api.Move(args.dir, args.amount)
        await msg.author.send(tools.gembed(`You ${tools.random(0, 1) == 1 ? "limply " : ""}walk ${args.amount} amount of squares in the ${args.dir} direction. It is still dark, but you use \`ls\` and figure out where you are`, "Moving"))
        await msg.author.send(await api.DisplayMap())
    }
}


export = command