import {Command, GenericArg} from "shadytools"
// import {Model, Document} from "mongoose"
import {GuildMember, TextChannel} from "discord.js"
import got from "got"
import {API, GenUser} from "../APIinteractor/index"
import { mod, SH, _SH_ } from "../models/DUser"
import { User } from "../APIinteractor/types"
import userEmbed from "../Components/UserEmbed"

interface _Args_ extends GenericArg {
    id?: string,
    token?: string
}



const command:Command = {
    name: "start",
    desc: "Begins your journey. If you already have a id & token, input them as `!start <id> <token>`. If you dont, then just say `!start <name with spaces if you want>`",
    group: "Beggining!",
    perm: "Member",
    cooldown: 5,
    args: [],
    async execute(msg, tools, _args) {
        const args:_Args_ = await tools.parse<_Args_>(_args, msg, ["id", "token"])
        let ElUser:User;
        if (await mod.findOne({DID:msg.author.id})) {
            throw "User already created!"
        } 
        if (args.id && args.token) {
            const api = new API(args.id, args.token, tools)
            try {
                const User = await api.GetUser()
                const DUser:SH = {
                    DID: msg.author.id,
                    ID: args.id,
                    Token: args.token,
                    NPC: {
                        4: {lastDialog: -1, lastLevel: 0},
                        "5": {lastDialog: -1, lastLevel: 0},
                        "6": {lastDialog: -1, lastLevel: 0},
                        7: {lastDialog: -1, lastLevel: 0}
                    }
                }
                await new mod(DUser).save()
                ElUser = User
            } catch (err) {
                let name = " "
                console.error(err)
                for (let argName of _args) {
                    name += argName + " "
                }
                if (!name) throw "Can't have an empty name!"
                ElUser = await GenUser(name.trim())
                await new mod({DID: msg.author.id, ID:ElUser.id, Token: ElUser.Token}).save()
            }
        } else {
            if (!args.id) {
                throw "Can't have an empty name!"
            }
            ElUser = await GenUser(args.id.trim())
            await new mod({DID: msg.author.id, ID:ElUser.id, Token: ElUser.Token}).save()
        }
        await msg.author.send(tools.gembed("Hello & welcome, developer. I see you began your journey up to the root directory... Well, good luck. There are certain... Obstacles in your way. You'll need quite some luck to manage to actually survive all the way till the top. Remember to use !help for help :D", "Welcome!"))
        await msg.author.send(await userEmbed(tools, ElUser))
    }
}


export = command