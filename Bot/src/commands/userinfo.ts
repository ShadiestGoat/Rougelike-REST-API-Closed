import {Command, GenericArg} from "shadytools"
// import {Model, Document} from "mongoose"
import {GuildMember, TextChannel} from "discord.js"
import got from "got"
import {API, GenUser} from "../APIinteractor/index"
import { mod, SH, _SH_ } from "../models/DUser"
import { User } from "../APIinteractor/types"
import userEmbed from "../Components/UserEmbed"
import { D2U } from "../toolsForBot"




const command:Command = {
    name: "user",
    desc: "Your user stats!",
    group: "User",
    perm: "Member",
    cooldown: 5,
    args: [],
    async execute(msg, tools, _args) {
        const api = await D2U(msg.author.id, tools)
        await msg.author.send(await userEmbed(tools, await api.GetUser()))
    }
}


export = command