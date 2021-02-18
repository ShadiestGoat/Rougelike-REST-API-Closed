import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U } from "../toolsForBot"
import {  } from "discord-paginationembed";
import { Directions, Potion, _weapon_ } from "../APIinteractor/types";
import InvEmbed from "../Components/InvEmbed";
import { TextChannel } from "discord.js";
import { args } from "./armor";



const command:Command = {
    name: "help",
    desc: "shows this help command",
    group: "Help",
    perm: "Member",
    cooldown: 5,
    args: [{name: "command name", description: "the command you want help on", required: false, type: "STRING"}],
    async execute(msg, tools, _args) {
        if (!tools.client) throw "Bad code (no clinet), Bot"
        if (!(await mod.findOne({DID: msg.author.id}))) {
            await msg.author.send(tools.gembed("Ah! I see youre a new one here, and haven't began yet, huh? Well, that doesn't matter, now does it? To beggin, just simply do `!start <name with spaces if you want>`. If you already have an id & token, then do `!start <id> <token>`", "Begginer"))
            return
        }

        if (_args[0]) {
            if (_args[0] in tools.client.commands) {
                let arg2 = ""
                let argsString = "```\n"
                const command = tools.client.commands[_args[0]]
                for (const arg of command.args) {
                    arg2 += `{${arg.name}${!arg.required ? `? (${arg.defaultValue})` : ""}} `
                    let argChoices:string | string[] = []
                    for (let argChoice of (arg.choices ?? [])) {
                        argChoices.push(argChoice.name)
                    }
                    argChoices = argChoices.join(" | ")
                    argsString += `\n\t${arg.required ? "*" : ""}${arg.name} : ${arg.type} ${argChoices ? '(' + argChoices + ')' : ""}- ${arg.description}`
                }
                argsString += "```"
                
                await msg.author.send(tools.gembed(`How to use - \`${_args[0]}\`${argsString != "```\n```" ? "\n" + argsString : ""}\n\`!${_args[0]}${arg2 ? " " + arg2.trimEnd() : ""}\` - ${command.desc}\n`, `Help! (${_args[0]})`))
                return
            }
        }

        let grouped:{[key:string]: Command[]} = {}

        for (let command in tools.client.commands) {
            const com = tools.client.commands[command]
            if (com.group == "Beggining!") continue
            if (!grouped[com.group]) {
                grouped[com.group] = [com]
            } else {
                grouped[com.group].push(com)
            }
        }
        let desc = ""
        for (let group in grouped) {
            desc+=`\`\`\`${group}\`\`\``
            for (let command of grouped[group]) {
                desc+=`\`${command.name}\`${command.desc ? ' - ' + command.desc : ""}\n`
            }            
        }
        
        await msg.author.send(tools.gembed(
            desc,
            "Help!"
        ))
    }
}




export = command