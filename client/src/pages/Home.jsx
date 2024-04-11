// import React from 'react'
import {Link} from 'react-router-dom';

export default function Home() {
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


      {/* search */}



      {/* za sell rent offer */}
    </div>
  )
}
