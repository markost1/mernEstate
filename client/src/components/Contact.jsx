import { useState, useEffect} from "react";
import { Link } from "react-router-dom";


export default function Contact( {listing} ) {
  const [landlord, setLandlord] =  useState({});
  const [message,setMessage] = useState('');

  const onChange = (e) =>{
    setMessage(e.target.value)
  }

  useEffect(() => {
      const fetchLandlord = async () => {
        try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          const data =  await res.json();
          setLandlord(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
        }
    fetchLandlord();
      
  },[listing.userRef])

  return (
    <>
      {landlord && (
        < div className="flex flex-col gap-2">
          <p>Contact <span className="font-semibold">{landlord.username}</span> for <span className="font-semibold">{listing.name.toLowerCase()}</span></p>
          <textarea className="w-full p-3 rounded-lg" onChange={onChange} name="message" value={message} placeholder="enter a message" id="message" rows='2'></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-700 text-white uppercase p-3 rounded-lg text-center">
          Send Message
          </Link>
        </div>
        
      )}
    </>
  )
}
