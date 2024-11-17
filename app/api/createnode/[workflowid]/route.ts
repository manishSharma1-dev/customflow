import { NextResponse } from "next/server"
import { Nodemodel  } from "@/models/node.model"
import { ConnectDB } from "@/connections/ConnectDb"
import { Flowmodel } from "@/models/controlflow.model"

export async function POST(req:Request , { params } : { params : any }) {

    try {

        await ConnectDB()
        
        const { text } = await req.json()

        const { workflowid } = await params
    
        if(!text){
            return NextResponse.json(
                {
                    success : false,
                    message : "failed -Invalid text"
                },
                {
                    status : 400
                }
            )
        }

        if(!workflowid){
            return NextResponse.json(
                {
                    success : false,
                    message : "failed -Invalid workflowid"
                },
                {
                    status : 400
                }
            )
        }

        const customflowidchecking = await Flowmodel.findById(workflowid)

        if(!customflowidchecking){
            return NextResponse.json(
                {
                    success : false,
                    message : "failed -Id didin't match"
                },
                {
                    status : 400
                }
            )
        }

        const latestNode = await Nodemodel.findOne({
            controlflowid : workflowid
        }).sort({ index : 'desc'})
        
        
        const newNode = await Nodemodel.create({
            text : text,
            index : latestNode ? latestNode?.index + 1 : 0,
            controlflowid : workflowid
        })
    
        const checkifnewnodeisCreated = await Nodemodel.findById(newNode._id).select(" -text")
    
        if(!checkifnewnodeisCreated){
            return NextResponse.json(
                {
                    success :false,
                    message : "failed -Cannot find new created node"
                },
                {
                    status : 400
                }
            )
        }
    
        await newNode.save({ validateBeforeSave : true })

        await Flowmodel.findByIdAndUpdate(workflowid, { 
            $push: { Nodes: newNode._id } 
        });

    
        return NextResponse.json(
            {
                success : true,
                message : "new Node has been created",
                newNode
            },
            {
                status : 200
            }
        )
        
    } catch (error) {
        return NextResponse.json(
            {
                success :false,
                message :"failed- to create new -Node",
                error : error
            },
            {
                status :500
            }
        )
    }

}