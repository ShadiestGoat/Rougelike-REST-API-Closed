import {User} from "./user/response"
import { mod as UserModel } from "../models/user"
import { Coords, Directions } from "./map/response";
import { cnfMap } from "../config/config"

export function randInt(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function chance(chance:number) {
    return (Math.random() * (100)) < chance
}

export async function UpdateUser(User:User) {
    delete (User as any).__v
    delete (User as any)._id
    
    const ha = await UserModel.replaceOne({Token: User.Token, id:User.id}, User)
}

export async function dir2coords(OgCoords:Coords, dir:Directions):Promise<Coords> {
    switch(dir) {
        case "up":
            if (OgCoords[0] === 0) throw "Out of bounds"
            OgCoords[0] -= 1
            break
        case "down":
            if (OgCoords[0] === cnfMap.dimensions-1) throw "Out of bounds"
            OgCoords[0] += 1
            break        
        case "left":
            if (OgCoords[1] === 0) throw "Out of bounds"
            OgCoords[1] -= 1
            break
        case "right":
            if (OgCoords[1] === cnfMap.dimensions-1) throw "Out of bounds"
            OgCoords[1] += 1
            break
    }
    
    return OgCoords
}

export const NumberRegExp = "(\\d+)"