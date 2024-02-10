// import React from 'react'
import { useRef } from "react";
import { useSelector } from "react-redux";


export default function Profile() {
  const {currentUser} = useSelector((state) => state.user )
  const fileRef = useRef(null)
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>

      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2" src={currentUser.avatar} alt='profile'/>
        <input type ='text' className="border rounded-xl p-3" placeholder="username" id='username'/>
        <input type ='email' className="border rounded-xl p-3" placeholder="email" id='email'/>
        <input type ='password' className="border rounded-xl p-3" placeholder="password" id='password'/>
        <button type="submit" className="bg-slate-700 text-white rounded-xl uppercase p-3 ">Update</button>
      </form>
      <div className="flex flex-row justify-between py-3">
        <span className="text-red-500 cursor-pointer">Delete account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
