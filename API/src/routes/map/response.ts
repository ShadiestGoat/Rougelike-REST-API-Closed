

    export type Directions = "up" | "down" | "left" | "right"
    export type Coords = [number, number]
    export type TileType = 
            "▢" | 
            "▩" | 
            "△" |
            "▷" | 
            "▣" | 
            "◈" |
            "◆" |
            "◧"
            
    export interface Map {
        layout: TileType[][],
        ExitCoord: Coords,
        Level: number,
        MonsterKey: {
            [key:string]: number
        },
        Rooms: {
            [key:string]: boolean
        },
        UserPos: Coords,
        NPCs: {
            [key:string]: number
        }
        NextLevel?: number 
    }

export const DirRegexp = "(up|down|left|right)"


/*key
    ▢ - empty
    ▩ - wall
    △ - Monster
    ▷ - Challenger room
    ▣ - chest
    ◈ - user position
    ◆ - exit
    ◧ - NPC (shop keeper)
*/


export const Walkable = ["▢",  "◈", "△"]
