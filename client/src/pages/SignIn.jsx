import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'; //ovaj hook koristimo da bi otpremili funkcije
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'; //importujemo sve funkcije koje smo napravili

export default function SignIn() {
  const [formData,setFormData] = useState({});
  // const [error,setError] = useState(null);
  // const [loading,setLoading] = useState(false); na kraju
  const {error,loading} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch(); //

  const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      //setLoading(true); sada umjesto ovoga mozemo staviti 
      dispatch(signInStart());

      const res  = await fetch('api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify(formData)
      })
      
      const data = await res.json();
      if(data.success === false){
      //  setLoading(false); 
      //  setError(data.message); u koliko se greska dogodi mozemo da stavimo i parsiramo data.message
      dispatch(signInFailure(data.message))
        
        return;
      }
      // setLoading(false);
      // setError(null);//u koliko je ucitavanje uspjesno mozemo da stavimo
      dispatch(signInSuccess(data))
      navigate('/');
     // console.log(data);
    }catch (error) {
      // setLoading(false);
      // setError(error.message) u koliko se desila greska
      dispatch(signInFailure(error.message))
    }
  }

 // console.log(formData);
  
  return (

    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"> 
        {loading ? 'Loading ...' : 'Sign in' }
        </button>
      </form> 

      <div className='flex flex-row gap-3 mt-5'>
      <p>Dont have an acount?</p>
      <Link to={"/sign-up"}>   
      <span className='text-blue-500'>Sign-up</span> 
      </Link>
      </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
