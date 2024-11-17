"use client"

import React, { useEffect, useState } from "react";
import { glory } from "@/styles/fonts"
import { Input } from "@/components/ui/input"
import { NextResponse } from "next/server";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  const [buttonclicked,setbuttonclicked] = useState(false)
  const [projectname,Setprojectname] = useState("")
  const [workflowdata,setWorkflowdata] = useState([])

  const router = useRouter()

  useEffect(() => {
    const fetchallworkflow = async() => {
      const response = await fetch('/api/getallflow')

      if(!response.ok){
        return NextResponse.json(
          {
            data : await response.json()
          }
        )
      }

      const data = await response.json()

      // console.log("data respouseve",data)?
      // console.log("data response 2",data?.data)


      setWorkflowdata(data?.data)

    }

    fetchallworkflow()

  },[])

  async function handlworkflowdata(workflowid: any) {
    // on click -> 
    // fetch all the dta mean nodes of the single workflow
    // - > move to that node data
    router.push(`/workflow/${workflowid}`)
  }

  async function handlebuttonclicked(){

    try {

      setbuttonclicked(true)
       
      if(projectname.length == 0){
        return NextResponse.json(
          {
            success : false,
            message : "project name must be valid"
          },
          {
            status : 400
          }
        )
      }
  
      const response  = await fetch('/api/createflow',{
        method : 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ projectname })
      })
  
      if(!response){
        return NextResponse.json(
          {
            success : false,
            message : "Invalid response"
          },
          {
            status : 404
          }
        )
      }
      
      setbuttonclicked(false)

      await router.push('/customflow')
        
    } catch (error) {

      setbuttonclicked(false)

      return NextResponse.json(
        {
           success :false,
           message : "faield to create new Workflow",
           error : error
        },
        {
          status : 500
        }
      )

    }

  }

  return (
      <div className="min-h-screen flex gap-5 flex-col justify-center items-center ">

          {workflowdata? 
          (
            <>
              <p className={`${glory.className} bg-yellow-300 px-1 py-1 text-3xl`}>Your Previous workflow</p> 
              {Array.isArray(workflowdata) && workflowdata.map((workflow : any , idx :any) => (
                  <div className="grid grid-cols-3 gap-10 cursor-pointer border-b border-black" key={idx} onClick={() => handlworkflowdata(workflow ? workflow._id : "no id passed")} >
                      <p className="opacity-65 text-sm">{idx ? idx : "0"}</p>
                      <p className="opacity-65 text-sm">{workflow ? workflow.projectname : "no valid name"}</p>
                      <p className="opacity-65 text-sm">{workflow ? workflow.createdAt : "nil"}</p>
                  </div>
              ))}
            </>
          )
           : 
          (
            <>
              <p>NO Proevious workflow</p>
            </>
          )
          }


        <p className={`text-2xl mt-12 ${glory.className}`}>Create your Workflow here 🐱‍🏍.</p>

        <Dialog>
          <DialogTrigger asChild>
            <button className={`bg-black text-sm text-white py-2 px-6 rounded shadow shadow-gray-400`}>Create your first workflow.</button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Custom flow</DialogTitle>
              <DialogDescription>
                Name your custom flow project here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="project name" className={`${glory.className} font-semibold opacity-50 text-sm  text-left`}>
                  Name your Project here
                </label>
                <Input
                  id="name"
                  placeholder="project name"
                  value={projectname}
                  onChange={(e) => Setprojectname(e.target.value)}
                  className="px-2 py-1 focus:outline-none text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <button type="submit"  className={`bg-black text-sm flex justify-center items-center text-white py-2 px-3 rounded shadow shadow-gray-400`} onClick={handlebuttonclicked}>
                {buttonclicked == false ? "Create" : <Loader2 size={14} className="animate-spin text-center"/>}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}
