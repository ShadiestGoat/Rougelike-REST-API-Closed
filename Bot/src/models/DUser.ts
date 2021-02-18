import {Document, Schema, Model, model} from "mongoose"
import { ModuleBody } from "typescript"

type npcMem = {lastDialog: number, lastLevel: number}

export interface SH {
    DID: string,
    ID: string,
    Token: string,
    NPC: {
        4: npcMem,
        5: npcMem,
        6: npcMem,
        7: npcMem
    }
}

export type _SH_ = SH & Document

const DSH = new Schema<_SH_>({
    DID: {unique: true, type:String},
    ID: {unique: true, type:String},
    Token: String,
    NPC: {
        4: {lastDialog: Number, lastLevel: Number},
        5: {lastDialog: Number, lastLevel: Number},
        6: {lastDialog: Number, lastLevel: Number},
        7: {lastDialog: Number, lastLevel: Number}
    }
})


export const mod:Model<_SH_> = model<_SH_>("ConnectedUsers", DSH)