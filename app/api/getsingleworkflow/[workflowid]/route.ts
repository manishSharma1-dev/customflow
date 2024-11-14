import { NextResponse } from "next/server"
import { Flowmodel  } from "@/models/controlflow.model"
import { ConnectDB } from "@/connections/ConnectDb"

export async function GET(req:Request, { params }: {params :any}) {
    
    try {

        await ConnectDB()

        const { workflowid } = await params

        if (!workflowid){
            return NextResponse.json(
                {
                    success : false,
                    message : "Invalid -Workflow Id"
                },
                {
                    status : 400
                }
            )
        }

        const workflowData = await Flowmodel.findById(workflowid)
    
        if(!workflowData){
            return NextResponse.json(
                {
                    success :false,
                    message : "failed -to get workflow data"
                },
                {
                    status : 500
                }
            )
        }
    
        return NextResponse.json(
            {
                success :true,
                message : "fetched Workflow data",
                data : workflowData
            },
            {
                status : 200
            }
        )
        
    } catch (error) {
        
        return NextResponse.json(
            {
                success :false,
                message :"failed to get workflow data",
                error : error
            },
            {
                status : 500
            }
        )
    }

}