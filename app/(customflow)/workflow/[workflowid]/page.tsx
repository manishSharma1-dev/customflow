"use client"

import { useParams } from 'next/navigation'
import { NextResponse } from 'next/server'
import React, { useEffect, useState } from 'react'
import { ReactFlow } from '@xyflow/react';
import { Background } from "@xyflow/react"
 
import '@xyflow/react/dist/style.css';
import { glory } from '@/styles/fonts';

export default function page() {
  const [onTabPressed,setOnTabPressed] = useState(false)

  const { workflowid } = useParams()

  async function handlekeydown(e : any){
    if(e.key === "Tab"){
      console.log("tab pressed")
      setOnTabPressed(true)
    } 
  }

  useEffect(() => {
    document.addEventListener("keydown",handlekeydown)

    return () => {
      window.removeEventListener("keydown", handlekeydown);
    };

  },[])


  // to lad data of the workflow
  async function handleseadch() {
 
  const res =  await fetch(`/api/getsingleworkflow/${workflowid}`)

  if(!res.ok){
    return NextResponse.json(
      {
        success : false,
        message : "res isn't valid"
      }
    )
  }

  console.log("response.json",await res.json())

  }

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  return (
    <div style={{ width: '100vw', height: '100vh' }} >
      <ReactFlow>
        <Background />

        {onTabPressed === false ? 
          ( 
            <div className='flex justify-center items-center min-h-screen'>
             <p className={`text-sm ${glory.className}`}>Press <span className='bg-black text-white px-2 py-1 rounded-md shadow-md shadow-slate-300 text sm'>/ tab</span> to Create your node struture.</p>
            </div>
          )
          : 
          (
            <>
              <ReactFlow  nodes={initialNodes} edges={initialEdges}>
                <Background />
              </ReactFlow>
            </>
          )
        }

      </ReactFlow>
    </div>
  )
}
