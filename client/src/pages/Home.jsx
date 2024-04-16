// import React from 'react'
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// Import Swiper React components
import { Navigation , Pagination, Autoplay, Scrollbar, A11y  } from 'swiper/modules';
//Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(()=>{
    const fetchOfferListings = async() =>{
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error);
      }
    }

      const fetchSaleListings = async() =>{
        try {
          const res = await fetch('/api/listing/get?type=sale&limit=4');
          const data = await res.json()
          setSaleListings(data)
          fetchRentListings()
        } catch (error) {
          console.log(error);
        }
      }

      const fetchRentListings = async()=>{
        try {
          const res = await fetch('/api/listing/get?type=rent&limit=4')
          const data = await res.json()
          setRentListings(data)
        } catch (error) {
          console.log(error);
        }
      }
    fetchOfferListings();
  },[])


  return (
    <div>
      {/* top */}
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Pronadji svoj novi 
      <span className='text-slate-500'> savrseni</span>
      <br/> dom iz snova
      </h1>

      <div className='text-gray-400 text-xs sm:text-sm'>
        Mern Estate je najbolje mjesto na kome mozete naci vase sledece savrseno mjesto za zivot.
        <br />
        U nasoj bazi posjedujemo sirok izbor nektretnina na vama je da izaberete.
      </div>

      <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:text-blue-500'>
        <button>Zapocni pretragu sada...</button>
      </Link>
    </div>


      {/* sLIDER KORISTIM SLIKE IZ POSLEDNJIH OFFERA  swiper*/}
     <Swiper  modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]} navigation loop autoplay pagination={{clickable:true}} Autoplay>
    {
      offerListings && offerListings.length > 0 && 
      offerListings.map((listing)=>(
        <SwiperSlide key={listing.id}>
          <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:"cover"}}
          className='h-[500px]' key={listing.id}></div>
         
        </SwiperSlide>
      ))
    }


     </Swiper>


      {/* za sell rent offer */}
      <div className='max-w-6xl mx-auto flex flex-col justify-center gap-8 my-10'>
    {/* offer */}

    {offerListings && offerListings.length > 0 && (
      <div className=''>
      <div className='my-3'>
      <h2 className='text-2xl font-semibold text-slate-600 '>Recent offer</h2>
      <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
      </div>
      <div className=' flex flex-wrap gap-2'>
        {offerListings.map((listing)=>(
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
      </div>
    )}
    {/* sale */}
    {saleListings && saleListings.length > 0 && (
      <div className=''>
      <div className='my-3'>
      <h2 className='text-2xl font-semibold text-slate-600 '>Recent places for sale</h2>
      <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more offers</Link>
      </div>
      <div className=' flex flex-wrap gap-2'>
        {saleListings.map((listing)=>(
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
      </div>
    )}
    {/* rent */}
    {rentListings && rentListings.length > 0 && (
      <div className=''>
      <div className='my-3'>
      <h2 className='text-2xl font-semibold text-slate-600 '>Recent listings for rent</h2>
      <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more offers</Link>
      </div>
      <div className=' flex flex-wrap gap-2'>
        {offerListings.map((listing)=>(
          <ListingItem listing={listing} key={listing._id} />
        ))}
      </div>
      </div>
    )}

      </div>


    </div>
  )
}
