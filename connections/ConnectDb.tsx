import mongoose from "mongoose";
import { NextResponse } from "next/server";

type ConnectionObject =  {
    isConnected? : number
}

const connection: ConnectionObject = {}

const ConnectDB = async() => {
    try {

        if(connection.isConnected){
        } else {

            const ConnectionString = process.env.DATABASE_URI
            const DBConnCollection = process.env.DB_COLL
            const connectionResponse = await mongoose.connect(`${ConnectionString}${DBConnCollection}`)
        
            if(!connectionResponse){
                return NextResponse.json(
                    {
                        success : false,
                        message : "failed to connect to the DB"
                    },
                    {
                        status : 500
                    }
                )
            }

            connection.isConnected = connectionResponse.connections[0].readyState
        
            console.log("DB connected Successfully")
        }
        
    } catch (error) {

        return NextResponse.json(
            {
                success : false,
                message : "DB connection failed",
                error : error
            },
            {
                status : 500
            }
        )

    }
}

export { 
    ConnectDB
}