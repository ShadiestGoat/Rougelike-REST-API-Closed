import {readdirSync} from "fs"
import {Command, CustomClient, Tools, GenericArg} from 'shadytools'
import {Client, Message, MessageReaction, PartialUser, User} from "discord.js"
// import * as mongo from "mongoose"
import {resolve} from "path"
import chalk from "chalk"

const client:CustomClient = new CustomClient(new Tools({ConfigPath:resolve("./config/"), Opt: {}}).config().token, false, { partials: ['MESSAGE', 'REACTION', "GUILD_MEMBER", "USER"],  })
const tools:Tools = new Tools({ConfigPath:resolve("./config/"), Opt:{Tickets:false, Warning:false}}, client)

async function loader(msg:Message) {
	if (msg.guild) {return}
    if (msg.author.bot) return
	if (!msg.content.startsWith(tools.config().prefix)) {return};

	const args = msg.content.slice(tools.config().prefix.length).trim().split(/ +/);
	const command = args.shift()?.toLowerCase() || ""
	if (!(command in client.commands)) return;
    
	try {
		const Complete = client.commands[command]
		await Complete.execute(msg, tools, args);
	} catch (error) {
		await msg.author.send(tools.gembed(error, "There was an error!", tools.config().embed.bad_color))
		console.log(chalk.yellow(command) + " : " + chalk.red(error))
	}

}

const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command:Command = require(`./commands/${file}`);
	client.addCommand(command)
}

client.on('ready', async () => {
    console.log(chalk.green("Ready!"))
})

client.on("message", async (msg) => {
    await loader(msg)
})


tools.db.on('error', console.error.bind(console, 'connection error:'));

client.login(tools.config().token)