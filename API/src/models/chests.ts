import {Document, Model, Schema, model} from "mongoose";
import { Item } from "../routes/inventory/response"

export interface Echest {
    Token: string,
    Containers: [ContainerM, ContainerM, ContainerM, ContainerM]
}

interface ContainerM {
    Other: Item
    Potion: Item
    Scroll: Item
    Rings: Item
    Map: {
        [id: number]: "Other" | "Potion" | "Scroll" | "Rings"
    }
}

export type _SH_ = Echest & Document

const ContainerSH = new Schema<ContainerM & Document> ({
    Other: Schema.Types.Mixed,
    Potion: Schema.Types.Mixed,
    Scroll: Schema.Types.Mixed,
    Rings: Schema.Types.Mixed,
    Map: Schema.Types.Mixed
})

// Final --------------------------------------------

export const SH = new Schema<_SH_>({
    Token: {unique: true, type: String},
    Conainers: [ContainerSH]
})

export const mod:Model<_SH_> = model<_SH_>("EChests", SH)