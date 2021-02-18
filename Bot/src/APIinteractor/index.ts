import axios from "axios"
import { MessageAttachment, MessageEmbed } from "discord.js"
import { Tools } from "shadytools"
import * as types from "./types"
import {generate} from "text-to-image"



export async function GenUser(name:string):Promise<types.User> {
    const resp = (await axios.post<types.User | types.error>("https://sq.shadygoat.eu/newUser", undefined, {headers: {name:name}})).data
    if ("error" in resp) {throw resp.error}
    return resp
}

export class API {
    id:string
    token:string
    basePath:string
    tools:Tools
    constructor(id:string, token:string, tools:Tools) {
        this.id = id
        this.token = token
        this.basePath = "https://sq.shadygoat.eu/api"
        this.tools = tools
    }


    
    async GetUser():Promise<types.User> {
        return await this.AuthedRequest<types.User>("/user/info")
    }
    async GetUserStats():Promise<types.UserStats> {
        return await this.AuthedRequest<types.UserStats>('/user/stats')
    }
    async FreeSpace():Promise<types.Bags> {
        return await this.AuthedRequest<types.Bags>('/inventory/freeSpace')
    }
    async MaxSpace():Promise<types.Bags> {
        return await this.AuthedRequest<types.Bags>('/inventory/storageMax')
    }

    async Move(dir:types.Directions, amount?: number) {
        let q = ""
        if (amount) q= `?amount=${amount}` 
        return await this.AuthedRequest<types.User>(`/map/move/${dir}${q}`)
    }
    async DisplayMap():Promise<MessageEmbed> {
        const resp =  await this.AuthedRequest<string>('/map/display')
        if (resp.split('<br />')[0].length == 19) {
            return this.tools.gembed(
                `\`\`\`\n\t ${(resp).replaceAll('<br />', "\n\t ").slice(0, -3)}\`\`\`
                \`You ◈ Empty ▢ Wall ▩ Chest ▣ Monster △ Room ▷ Exit ◆\`
                `,
                "Map"
            )
        } else {
            return this.tools.gembed(
                `\`${(resp).replaceAll('<br />', "\n").slice(0, -1)}\`\n
                \`You ◈ Empty ▢ Wall ▩ Chest ▣ Monster △ Room ▷ Exit ◆\``,
                "Map"
            )
        }
    }

    async Attack():Promise<types.FightStats> {
        return await this.AuthedRequest<types.FightStats>(`/user/fight/attack`)
    }



    async Equip(id:number):Promise<types.User> {
        return await this.AuthedRequest<types.User>(`/inventory/equip/${id.toString()}`)
    }

    async Drink(id:number):Promise<types.User> {
        return await this.AuthedRequest<types.User>(`/inventory/drink/${id.toString()}`)
    }
    async Drop(id:number):Promise<types.User> {
        return await this.AuthedRequest<types.User>(`/inventory/drop/${id.toString()}`)
    }
    

    async FightMonster(dir:types.Directions):Promise<types.User> {
        return await this.AuthedRequest<types.User>(`/monster/fight/${dir}`)
    }


    async Up(dir:types.Directions):Promise<types.Map> {
        return await this.AuthedRequest<types.Map>(`/map/up/${dir}`)
    }

    async Open(dir:types.Directions):Promise<types.Item> {
        return await this.AuthedRequest<types.Item>(`/map/open/${dir}`)        
    }

    private AuthHeaders():{id:string, token:string} {
        return {id:this.id, token:this.token}
    }

    private async AuthedRequest<T extends Object | string>(path:string) {
        const resp = (await axios.get<T | types.error>(this.basePath + path, {headers: this.AuthHeaders()}))

        if (resp.headers['content-type'] == "text/html; charset=utf-8") {
            if (typeof resp.data == "string")
            return resp.data
        }

        if ("error" in resp.data) {throw resp.data.error}
        return resp.data
    }

    private async AuthedPostRequest<T extends Object>(path:string, _headers: object) {
        let headers:object = Object.assign(this.AuthHeaders(), _headers)
        return (await axios.post<T | types.error>(this.basePath + path, undefined, {headers: headers})).data
    }
}