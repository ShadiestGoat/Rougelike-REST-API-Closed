import {Command, GenericArg} from "shadytools"
import { mod, SH, _SH_ } from "../models/DUser"
import { D2U, dirchoices, dir2coords } from "../toolsForBot"
import { Directions, Potion, _weapon_ } from "../APIinteractor/types";
import { API } from "../APIinteractor";
import { getCombinedModifierFlags } from "typescript";

interface _Args_ extends GenericArg {
    dir: Directions
}



const command:Command = {
    name: "talk",
    desc: "Talk to an npc in {dir} direction",
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
        const user = await mod.findOne({DID:msg.author.id})
        const api = new API(user.id, user.Token, tools)
        const map = (await api.GetUser()).Map
        const cords = dir2coords(map.UserPos, args.dir, map)
        if (map.layout[cords[0]][cords[1]] != "◧") {
            let tile = map.layout[cords[0]][cords[1]]
            await msg.author.send(tools.gembed(tile == "△" ? "You talk to the bugy corrupted files. You get no response" : tile == "▣" ? "You talk to the zip file. You get no response. Are you going crazy?" : tile == "▩" ? "You try to talk to the sudo protected files (walls). You have no permission to even look at them, you think theyll respond?" : tile == "◆" ? "You talk to a symlink. Why?" : "Why would you even try this?", "Like talking to a real wall..."))
            return
        }
        const npc = map.NPCs[cords.toString()]
        if (!([4, 5, 6, 7].includes(npc))) {await msg.author.send(tools.gembed("You try to talk to this npc, but they don't seem to respond, groggling on about how shops weren't implemented yet...", "Not implemented shops ://")); return}

        const config = (await import('../config/npcs')).default((await api.GetUser()).Name)
        const dianum = user.NPC[npc].lastLevel == map.Level ? user.NPC[npc].lastDialog : user.NPC[npc].lastDialog
        const dialog = config[4][dianum + 1 > config[npc].maxDialog ? config[npc].lastone : dianum]
        await msg.author.send(dialog, config[npc].name)
        user.NPC[npc] = {lastDialog: user.NPC[npc].lastDialog + 1, lastLevel: user.NPC[npc].lastLevel + 1}
        await user.updateOne(user)
    }
}




export = command