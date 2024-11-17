import { NextResponse } from "next/server"
import { Flowmodel  } from "@/models/controlflow.model"
import { ConnectDB } from "@/connections/ConnectDb"

export async function POST(req:Request) {

    try {

        console.log("test 1")

        await ConnectDB()

        const { projectname } = await req.json()

        console.log("project name in backend",projectname)
        
        console.log("test 2")

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

        console.log("test 3")
    
        const newWorkflow = await Flowmodel.create({
            projectname : projectname
        })

        console.log("test 5")
    
        const checkifnewWorkFlowcreated = await Flowmodel.findById(newWorkflow._id)

        console.log("test 6")
    
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

        console.log("test 7")
    
        await newWorkflow.save({ validateBeforeSave : true })

        console.log("test 8")
        
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