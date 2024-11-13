import { NextResponse } from "next/server"
import { Flowmodel  } from "@/models/controlflow.model"
import { ConnectDB } from "@/connections/ConnectDb"

export async function POST(req:Request) {

    try {

        await ConnectDB()

        const { projectname } = await req.json()
    
        if(!projectname){
            return NextResponse.json(
                {
                    success : false,
                    message : "failed -Invalid Project Name"
                },
                {
                    status : 400
                }
            )
        }
    
        const newWorkflow = await Flowmodel.create({
            projectname : projectname
        })
    
        const checkifnewWorkFlowcreated = await Flowmodel.findById(newWorkflow._id)
    
        if(!checkifnewWorkFlowcreated){
            return NextResponse.json(
                {
                    success :false,
                    message : "failed -Cannot find new created Wworkflow"
                },
                {
                    status : 400
                }
            )
        }
    
        await newWorkflow.save({ validateBeforeSave : true })
    
        return NextResponse.json(
            {
                success : true,
                message : "new Workflow has been created",
                newWorkflow
            },
            {
                status : 200
            }
        )
        
    } catch (error) {
        return NextResponse.json(
            {
                success :false,
                message :"failed- to create new Workflow",
                error : error
            },
            {
                status :500
            }
        )
    }

}