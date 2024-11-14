import mongoose, { Schema, Document} from "mongoose"

export interface nodeInterface extends Document {
    text : string,
    index : number,
    controlflowid : string,
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
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)

const Nodemodel = mongoose.models.Nodemodel as mongoose.Model<nodeInterface> || mongoose.model("Nodemodel",nodeSchema)

export {
    Nodemodel
}