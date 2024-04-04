

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' 
                           id='searchTerm' 
                           placeholder='Search...' 
                           className='border rounded-lg p-3 w-full' />
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="all" className='w-5' />
                        <span>Rent and Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="rent" className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="sale" className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="offer" className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>

                {/* drugi dio */}

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="parking" className='w-5' />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="furnished" className='w-5' />
                        <span>Furnished</span>
                    </div>
                  
                </div>

                {/* treci dio sort */}
                <div className='flex items-center gap-3'>
                    <label className='font-semibold'>Sort:</label> 
                    <select id="sort_order" className='border rounded-lg p-3'>
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>

                    </select>

                </div>

                {/* kreiranje btn-a */}
                <button className='bg-slate-600 p-3 rounded-lg text-white uppercase hover:opacity-90'>Search</button>
            </form>
        </div>

        {/* drugi kontejner ui */}
        <div className='text-3xl text-slate-600 font-semibold border-b-2 p-3 mt-5 '>
            <h1>Listing Results:</h1>
        </div>
    </div>
  )
}
