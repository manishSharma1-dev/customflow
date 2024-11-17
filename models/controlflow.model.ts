import mongoose,{ Schema, Document } from "mongoose"
import { nodeInterface } from "@/models/node.model"

export interface flowSchemaInterface extends Document {
    projectname : string,
    Nodes : nodeInterface[]
}

const flowSchema:Schema<flowSchemaInterface> = new Schema(
    {
        projectname : { 
            type : String,
            required : true
        },
        Nodes : [
            {
                type : Schema.Types.ObjectId,
                ref : "Node" //this ref must match the name of the node models
            }
        ]
    }
    ,{ timestamps : true }
)

const Flowmodel = mongoose.models.Flowmodel  as mongoose.Model<flowSchemaInterface> || mongoose.model("Flowmodel",flowSchema) 

export { 
    Flowmodel
}