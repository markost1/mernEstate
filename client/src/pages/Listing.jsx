import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';

// Import Swiper React components
import { Navigation , Pagination, Scrollbar, A11y  } from 'swiper/modules';


import { Swiper, SwiperSlide } from 'swiper/react';
import {useSelector} from 'react-redux';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
//react icons 
import {FaMapMarkerAlt, FaBath, FaParking, FaChair, FaBed, FaExpand, FaShare} from 'react-icons/fa';


export default function Listing() {

const [ listing , setListing] = useState(null)
const [ loading, setLoading] = useState(false) // efekat ocitavanja
const [error, setError] =  useState(false) //podesavanje greske 
const [copied, setCopied] = useState(false)

const params = useParams(); //inicijalizujem useParams
const {currentUser} = useSelector((state)=> state.user)
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
      {listing && !loading && !error && 
      <div>
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} navigation loop  className="w-full h-[550px]">
          {listing.imageUrls.map(url => (
              <SwiperSlide key={url}  >
                {/* <div className="flex justify-center h-[550px] bg-center bg-strech " style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}>  
                </div> */}
                <div className="flex items-center justify-center h-[550px]">
                <img src={url}  />
                </div>
              </SwiperSlide>
          ))}
        </Swiper>
        {/* za kopiranje linka */}
        <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-200 cursor-pointer">
                <FaShare  className="text-slate-500 "
                onClick = {()=>{
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(()=>{
                    setCopied(false)
                  },2000)
                }}
                 />
                 {copied && (
                  <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                  Link copied
                  </p>
                 )}
        </div>
        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
          <p className="text-2xl font-semibold">
          {/* ovaj dio je zanimljiv kod yanka eura pokazuje vrijednost u zavisnosti od uslova */}
          {listing.name} - €{' '}     
          {listing.offer ? listing.discountPrice.toLocaleString('en-US')
          : listing.regularPrice.toLocaleString('en-US')}   
          {listing.type === 'rent' && ' /months'}
          </p>
          <p className="flex items-center gap-2  text-slate-600 text-sm">
          <FaMapMarkerAlt className="text-green-600"/>
          {listing.address}
          </p>
          {/* dio za sale ili rent */}
          <div>
            <p className="bg-red-500 p-3 w-full max-w-[200px] rounded-md text-white text-center">
              {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
          </div>

          <p className="text-slate-800">
          <span className="text-black font-semibold">Description - </span>
          {listing.description}
          </p>
          <ul className="flex flex-wrap text-green-900 gap-4 sm:gap-6">
            <li className="flex items-center gap-1 whitespace-nowrap">
                <FaExpand className="text-lg"/> 48 m2
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
            <FaBed className="text-lg"/>
            
            {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
            
            </li>
            <li className="flex items-center gap-3 whitespace-nowrap">
            <FaBath className="text-lg" />
            
            {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
            
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
            <FaParking className="text-lg" />
            {listing.parking ? `Parking Spot ` : `Javni Parking`}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
            <FaChair className="text-lg" />
            {listing.furnished ?  'Namjesten' : 'Nije namjesten'}
            </li>
          </ul>
          {currentUser && listing.userRef !== currentUser._id && (
              <button className="p-2 bg-slate-700 text-white rounded-lg mt-4 uppercase hover:opacity-95">
              Contact Landlord
              </button>

          )}
        </div>
{/* mislim da ovdje treba contact */}


      </div>
      }
      

    </main>
  )
}


//napomena instaliranje paketa koji se zove swiper on omogucava slider da dodam a mogu vidjeti da ga napravim 
//swiper instaliram u clietnn folder ako se desi da instaliram u  back end izbrisem iz pacage.json i onda opet u 
// backend instaliram pakete npm i u terimnal komanda


//napomena ero znak kucam alt0128 €