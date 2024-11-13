import mongoose, { Schema, Document, mongo} from "mongoose"

export interface nodeInterface extends Document {
    text : string,
    index : number,
    controlflowid : number,
}

const nodeSchema:Schema<nodeInterface> = new Schema(
    {
        text : { 
            type : String,
            required : true
        },
        index : {
            type : Number,
            default : 0
        },
        controlflowid : {
            type : Number,
            required : true
        }
    },
    {
        timestamps : true
    }
)

const Nodemodel = mongoose.models.nodeInterface as mongoose.Model<nodeInterface> || mongoose.model("Nodemodel",nodeSchema)

export {
    Nodemodel
}