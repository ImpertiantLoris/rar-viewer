"use client"

import { useState } from "react"

export default function Home() {

  const [password, setPassword] = useState("")
  const [unlocked, setUnlocked] = useState(false)

  const checkPassword = async () => {

  try {
    await fetch("/api/pw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
  } catch (err) {
    console.error("Error sending password:", err);
  }

  if (password.length >= 3) {
    setUnlocked(true)
  }
}

  const rows = [
    { type:"folder", name:"5th March 2026", level:0 },
    { type:"folder", name:"GCE", level:1 },
    { type:"folder", name:"O-Level XIC", level:2 },

    { type:"folder", name:"Business", level:3 },
    { type:"folder", name:"P1 MS", level:4 },
    { type:"pdf", name:"Business P1 MS.pdf", level:5, size:"490 KB", link:"/files/MS Business Studies P1 Updated_.pdf" },

    { type:"folder", name:"Biology", level:3 },

    { type:"folder", name:"Paper 1 MS", level:4 },
    { type:"pdf", name:"Biology P1 MS.pdf", level:5, size:"223 KB", link:"/files/MS Biology P1 Updated_.pdf" },

    { type:"folder", name:"P2 MS", level:4 },
    { type:"pdf", name:"Biology P2 MS.pdf", level:5, size:"668 KB", link:"/files/MS Biology P2 Updated_.pdf" },
  ]

  return (

    <div className="min-h-screen bg-[#f2f2f2] p-6 font-sans">

      {/* PASSWORD BAR */}

      <div className="bg-[#e7e6c6] border rounded-md shadow-sm px-6 py-4 flex items-center gap-6">

        <span className="text-blue-600 text-lg">🔒</span>

        <span className="text-blue-600 font-medium">
          The following files requires a password
        </span>

        {!unlocked && (

          <div className="flex items-center gap-4 ml-6">

            <span className="text-gray-600">Password</span>

            <input
              type="text"
              placeholder="Type password here"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key==="Enter"){
                  checkPassword()
                }
              }}
              className="border-b border-gray-400 bg-transparent outline-none px-2 text-black placeholder-gray-400 w-64"
            />

            <button
              onClick={checkPassword}
              className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
            >
              Check Password
            </button>

          </div>

        )}

      </div>

      {/* ARCHIVE VIEWER */}

      <div className="mt-6 border bg-white rounded-md overflow-hidden">

        {/* HEADER */}

        <div className="flex justify-between px-6 py-3 border-b bg-[#f7f7f7]">

          <span className="font-semibold text-blue-600">
            5th March 2026 Mocks Updated MS
            <span className="text-gray-500 ml-2">(3 files)</span>
          </span>

          <div className="flex gap-12 text-blue-600">
            <span>5 Mar 2026</span>
            <span>4.7 MB</span>
            <span>🔒</span>
          </div>

        </div>

        {!unlocked ? (

          <div className="text-center py-16 text-gray-500 text-lg">
            🔒 Files Locked - Enter Password Above
          </div>

        ) : (

          rows.map((row,i)=>{

            const padding = 20 * row.level

            const content = (

              <div
                className="flex justify-between items-center px-6 py-3 border-b hover:bg-[#e7f0fb]"
              >

                <div
                  className="flex items-center gap-3"
                  style={{paddingLeft:padding}}
                >

                  {row.type==="folder" && (
                    <span className="text-xl">📁</span>
                  )}

                  {row.type==="pdf" && (
                    <img src="/pdf.png" className="w-6 h-6"/>
                  )}

                  <span className="text-gray-800">{row.name}</span>

                </div>

                <div className="flex gap-20 text-gray-600">

                  <span>5 Mar 2026</span>

                  <span>{row.size || ""}</span>

                  <span>🔒</span>

                </div>

              </div>
            )

            if(row.type==="pdf"){
              return (
                <a
                  key={i}
                  href={row.link}
                  download
                  className="block"
                >
                  {content}
                </a>
              )
            }

            return <div key={i}>{content}</div>

          })

        )}

      </div>

    </div>
  )
}