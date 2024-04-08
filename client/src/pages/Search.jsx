import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Search() {
       
        const navigate = useNavigate();
        const [sideBarData, setSideBarData] = useState({
            searchTerm: '',
            type: 'all',
            parking: false,
            furnished:false,
            offer:false,
            sort:'created_at',
            order:'desc',
        })
        const [loading,setLoading] = useState(false)
        const [listing,setListing] = useState([]);
        console.log(listing);

        useEffect(()=>{
            const urlParams = new URLSearchParams(location.search);
            const searchTermFromUrl = urlParams.get('searchTerm');
            const typeFromUrl = urlParams.get('type');
            const parkingFromUrl = urlParams.get('parking');
            const furnishedFromUrl = urlParams.get('furnished');
            const offerFromUrl = urlParams.get('offer');
            const sortFromUrl = urlParams.get('sort');
            const orderFromUrl = urlParams.get('order');

            if(searchTermFromUrl ||
                typeFromUrl ||
                parkingFromUrl || 
                furnishedFromUrl ||
                offerFromUrl ||
                sortFromUrl ||
                orderFromUrl 
                ){
                    setSideBarData({
                        searchTerm: searchTermFromUrl || '',
                        type:typeFromUrl || 'all',
                        parking: parkingFromUrl === 'true' ? true : false,
                        furnished: furnishedFromUrl === 'true' ? true : false,
                        offer: offerFromUrl === 'true' ? true : false,
                        sort:sortFromUrl || 'created_at',
                        order:orderFromUrl || 'desc',
                    })
                }

                const fetchListing = async () => {
                        //ovdje da fecujem podatke 
                        setLoading(true)
                        const searchQuery = urlParams.toString()
                        const res = await fetch(`/api/listing/get?${searchQuery}`)
                        const data = await res.json();
                        setListing(data)
                        setLoading(false)
                }

                fetchListing();

        },[location.search])

        const handleChange = (e) => {
                if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id ==='sale'){ 
                    setSideBarData({...sideBarData, type:e.target.id})
                 }

                 if(e.target.id === 'searchTerm'){
                    setSideBarData({...sideBarData, searchTerm: e.target.value})
                 }

                 if(e.target.id === 'parking' || e.target.id ==='furnished' || e.target.id ==='offer'){
                    setSideBarData({...sideBarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
                 }

                if(e.target.id === 'sort_order'){
                    const sort = e.target.value.split('_')[0] || 'created_at';
                    const order = e.target.value.split('_')[1] || 'desc';

                    setSideBarData({...sideBarData, sort, order})
                }


        }

        const handleSubmit = (e) =>{
            e.preventDefault();
            // prvo informacije o URLu
            const urlParams = new URLSearchParams(window.location.search);
            //podesvamo sadrzaj urla
            urlParams.set('searchTerm', sideBarData.searchTerm);
            urlParams.set('type',sideBarData.type);
            urlParams.set('parking', sideBarData.parking);
            urlParams.set('furnished', sideBarData.furnished);
            urlParams.set('offer', sideBarData.offer);
            urlParams.set('sort',sideBarData.sort);
            urlParams.set('order',sideBarData.order);

            //pretvaranje queri-a u string

            const searchQuery = urlParams.toString();

            navigate(`/search?${searchQuery}`)
            
        }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' 
                           id='searchTerm' 
                           placeholder='Search...' 
                           className='border rounded-lg p-3 w-full'
                           value={sideBarData.searchTerm}
                           onChange={handleChange}
                            />
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox'
                               id="all"
                               className='w-5'
                               onChange={handleChange}
                               checked={sideBarData.type === 'all'}
                         />
                        <span>Rent and Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox'
                         id="rent" 
                         className='w-5' 
                         onChange={handleChange}
                         checked={sideBarData.type === 'rent'}
                         />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' 
                        id="sale" 
                        className='w-5' 
                        onChange={handleChange}
                        checked={sideBarData.type === 'sale'}
                        />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' 
                        id="offer" 
                        className='w-5' 
                        onChange={handleChange}
                        checked={sideBarData.offer} //boolean vraca
                        />
                        <span>Offer</span>
                    </div>
                </div>

                {/* drugi dio */}

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' 
                        id="parking" 
                        className='w-5' 
                        onChange={handleChange}
                        checked={sideBarData.parking}
                        />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox'
                         id="furnished" 
                         className='w-5' 
                        onChange={handleChange}
                        checked={sideBarData.furnished}
                         />
                        <span>Furnished</span>
                    </div>
                  
                </div>

                {/* treci dio sort */}
                <div className='flex items-center gap-3'>
                    <label className='font-semibold'>Sort:</label> 
                                                                 {/*promjena ispod ipak ne */}
                    <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border rounded-lg p-3'>
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>

                    </select>

                </div>

                {/* kreiranje btn-a */}
                <button className='bg-slate-600 p-3 rounded-lg text-white uppercase hover:opacity-90'>Search</button>
            </form>
        </div>

        {/* drugi kontejner ui */}
        <div className='text-3xl text-slate-600 font-semibold border-b-2 p-3 mt-5 '>
            <h1>Listing Results:</h1>
            {listing.map((list)=>{
                return <>
                    <p>{list.name}</p>
                </>
            })}
        </div>
    </div>
  )
}
