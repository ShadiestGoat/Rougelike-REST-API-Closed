import { _Element_ } from "../../config/interfaces"
import { Coords } from "../map/response";

export interface Monster {
    Type: number
    Level: number
    MaxHealth: number
    HP: number
    ExpGiven: number,
    MoneyGiven: number
    Elmnt: _Element_
    Attack: number
    Defense: number,
    Coords:Coords
}