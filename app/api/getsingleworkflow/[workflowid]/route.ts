import { NextResponse } from "next/server"
import { Flowmodel  } from "@/models/controlflow.model"
import { ConnectDB } from "@/connections/ConnectDb"

export async function GET(req:Request, { params }: {params :any}) {
    
    try {

        await ConnectDB()

        console.log("test 1")

        const { workflowid } = await params

        console.log("test 2")

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

        console.log("test 3")

        const workflowData = await Flowmodel.findById(workflowid).populate("Nodes");

        console.log("workflowdata",workflowData?.Nodes)

        console.log("test 4")
    
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

        console.log("test 6")
    
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