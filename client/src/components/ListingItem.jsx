import { Link } from "react-router-dom";
import {MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing}) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg 
    transition-shadow duration-300 overflow-hidden rounded-lg
    w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <div>
            <img src={listing.imageUrls[0]}  alt='listing cover'
                className="h-[320px] sm:h-[220px] w-full object-cover
                hover:scale-105 transition-scale duration-300"
            />
        </div>
        {/* nastavak 9,46 */}
        <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold">{listing.name}</p> 
            <div className="flex items-center gap-2"> 
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm ">{listing.address}</p>
            </div>
              <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
              <p className="text-slate-500 mt-2 font-semibold flex items-center">
              €{' '}
                {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US') }
                {listing.type === 'rent' && ' /month'}
              </p>
              <div className="flex text-sm gap-3">
                <div>
                  {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                </div>
                <div>
                  {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}
                </div>
              </div>
        </div>
       </Link>
    </div>
  )
}
