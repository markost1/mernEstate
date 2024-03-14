import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
//import swipera
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';


export default function Listing() {
SwiperCore.use(Navigation)
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
      setLoading(false);
      setError(false)
      } catch (error) {
        setError(true);
        setLoading(false)
      }
    
    }           
    fetchListing();                                                      
   },[params.listingId]) // ovdje je problem bio zbog ovoga sam ulazio u beskonacni loop
                        // tu zadajem da ce useeffect raditi kad kod sempromjeni listing url
  return (
    <main>
      {loading && <p className="text-center mt-7 text-2xl"> Loading...</p>}
      {error && <p className="text-center mt-7 text-2xl">Something went wrong</p>}
      {listing && !loading && !error && (
        <h1>{listing.name}</h1>
      )}
    </main>
  )
}


//napomena instaliranje paketa koji se zove swiper on omogucava slider da dodam a mogu vidjeti da ga napravim 
//swiper instaliram u clietnn folder ako se desi da instaliram u  back end izbrisem iz pacage.json i onda opet u 
// backend instaliram pakete npm i u terimnal komanda