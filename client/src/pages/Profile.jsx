// import React from 'react'
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { useSelector } from "react-redux";
import { app }  from '../firebase'


export default function Profile() {
  const {currentUser} = useSelector((state) => state.user )
  const fileRef = useRef(null)
  const [file,setFile] = useState(undefined);
  const [filePerc, setFilePerc] =  useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

  console.log(filePerc);
  //console.log(file);
console.log(fileUploadError);

  //firebase storage
  // allow read;
  // allow write: if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*') //nakon sto smo zavrsili podesavanja mozemo pristupati i uploadovati fajove.
  useEffect(()=>{
    if (file) {
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // unikatno ime fajla i ako se isti fajl uploaduje dva puta
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     // console.log('Upload is ' + progress + '% done ');
     setFilePerc(Math.round(progress))
    },
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>
          setFormData({...formData, avatar: downloadURL}) 
      );
    }
 );
}

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-center my-7 text-3xl font-semibold">Profile</h1>

      <form className="flex flex-col gap-4">
       
        <input onChange={(e)=>{setFile(e.target.files[0])}} type="file" ref={fileRef} hidden accept="image/*"/>
       
       
        <img onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2" src={formData.avatar || currentUser.avatar} alt='profile'/>
      
        <p className="text-green-600 text-center">
          {fileUploadError ? (
            <span>Image upload Error</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span>{`Uploading to ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span>Image successfully uploaded</span>
          ) : ('')
          }
        </p>
       
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
