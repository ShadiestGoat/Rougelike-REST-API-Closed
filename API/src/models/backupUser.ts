import {Document, Model, Schema, model} from "mongoose";
import { _SH_, SH } from "./user"

export const mod:Model<_SH_> = model<_SH_>("BackupUsers", SH)