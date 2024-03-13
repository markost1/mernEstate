import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';


export default function Listing() {

const [ listing , setListing] = useState(null)
const [ loading, setLoading] = useState(false) // efekat ocitavanja
const [error, setError] =  useState(false) //podesavanje greske 

const params = useParams(); //inicijalizujem useParams

  //useEffect hook = kad se izvrsi renerovanje stranice izvrsava se funkcija 
  useEffect(()=>{
    // fecuje podatke listinga
    const fetchListing =  async()=>{
      try {
        setLoading(true) // prije fechovanje podataka setujem ocitavanje na true
          //vec je kreirana get/:id api ruta
      const res = await fetch(`/api/listing/get/${params.listingId}`);//listing id iz app.jsx  //koristim useParams da dodjem do id listinga
      const data =  await res.json();
      if(data.success === false){
        setError(true);
        setLoading(false);
        return;
      }
      setListing(data) // listing je data sada
      setLoading(false);// vrlo bitno stanje jer ako ga nemam ulazim u beskonacni loop , svakako sam u beskonacni loop
      setError(false)
      } catch (error) {
        setError(true);
        setLoading(false)
      }
    
    }           
    fetchListing();                                                      
  },[params.listingId]) // ovdje je problem bio zbog ovoga sam ulazio u beskonacni loop

  return (
    <div>
      {listing && listing.name}
    </div>
  )
}
