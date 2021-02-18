import {Command, GenericArg} from "shadytools"
import { D2U } from "../toolsForBot"

const command:Command = {
    name: "attack",
    desc: "This attacks the monster, with all your strenght! After you hit it, it hits you in response, so be warned :D",
    group: "Monster",
    perm: "Member",
    cooldown: 5,
    args:[],
    async execute(msg, tools, _args) {

        const api = await D2U(msg.author.id, tools)
        const resp = await api.Attack()
        if (resp.UserDead) {
            await msg.author.send(tools.gembed(
                ":/",
                "You died!", 
                "RED"
            ))
            return
        }
        const User = await api.GetUser()

        if (!User.FightMode) throw "how is this possible??!?!??!?"
        // i need to make ts happy :)
        let fields = [
            {
                name: "Damage Dealt",
                value: `${resp.DamageDealt}${(resp.Crit ? ' (Crit!)' : "")}`,
                inline: true
            },
            {
                name: "Monster Hp : Your Hp",
                value: resp.MonsterHP + " : " + User.Hp + (resp.Dodged ? ' (Dodged!)' : ''),
                inline:true
            }
        ]
        
        if (resp.MonsterDead) {
            fields.push({
                name: "Monster is dead!",
                value: resp.LeveledUp ? "And you leveled up!" : "And even though you didnt level up, you are that much closer!",
                inline:true
            })
        }

        await msg.author.send(tools.gembed(
            `\n`,
            `You punched and sliced and here are the results...`,
            undefined,
            fields
            
        ))
    }
}




export = command