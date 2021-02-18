export interface _Element_ {
    Fire?: _ElmntAtDef_,
    Water?: _ElmntAtDef_,
    Air?: _ElmntAtDef_,
    Earth?: _ElmntAtDef_
}

export interface HardElmnt {
    Fire: _ElmntAtDef_,
    Water: _ElmntAtDef_,
    Air: _ElmntAtDef_,
    Earth: _ElmntAtDef_
}

export interface _ElmntAtDef_ {
    Attack: number, 
    Defense:number
}

export const elmnts = ["Fire", "Water", "Air", "Earth"]