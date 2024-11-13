import { NextResponse } from "next/server"
import { Flowmodel  } from "@/models/controlflow.model"
import { ConnectDB } from "@/connections/ConnectDb"

export async function GET(req:Request) {
    
    try {

        await ConnectDB()

        const allFlow = await Flowmodel.find({ })
    
        if(!allFlow){
            return NextResponse.json(
                {
                    success :false,
                    message : "failed -to get all workflow"
                },
                {
                    status : 500
                }
            )
        }
    
        return NextResponse.json(
            {
                success :true,
                message : "fetched all workflow",
                data : allFlow
            },
            {
                status : 200
            }
        )
        
    } catch (error) {
        
        return NextResponse.json(
            {
                success :false,
                message :"failed to get all workflow",
                error : error
            },
            {
                status : 500
            }
        )
    }

}