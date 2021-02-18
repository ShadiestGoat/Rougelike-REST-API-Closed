import { Tools } from "shadytools/src/Tools"
import { API } from "./APIinteractor"
import { Coords, Directions, Map } from "./APIinteractor/types"
import {mod} from "./models/DUser"

export async function D2U(DID:string, tools:Tools):Promise<API> {
    const resp = await mod.findOne({DID:DID})    
    if (!resp) {throw "User Not Found"}
    const api:API = new API(resp.ID, resp.Token, tools)
    return api
}
export const dirchoices:{name:string, value:string}[] = [
    {
        name: "right",
        value: "right"
    },
    {
        name: "left",
        value: "left"
    },
    {
        name: "up",
        value: "up"
    },
    {
        name: "down",
        value: "down"
    }
]

export function dir2coords(OgCoords:Coords, dir:Directions, map:Map):Coords {
    switch(dir) {
        case "up":
            if (OgCoords[0] === 0) throw "Out of bounds"
            OgCoords[0] -= 1
            break
        case "down":
            if (OgCoords[0] === map.layout.length-1) throw "Out of bounds"
            OgCoords[0] += 1
            break        
        case "left":
            if (OgCoords[1] === 0) throw "Out of bounds"
            OgCoords[1] -= 1
            break
        case "right":
            if (OgCoords[1] === map.layout.length-1) throw "Out of bounds"
            OgCoords[1] += 1
            break
    }
    
    return OgCoords
}