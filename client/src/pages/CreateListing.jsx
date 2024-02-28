import { useState } from "react"




export default function CreateListing() {

  const [files,setFiles] = useState({})

  console.log(files);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
  {/* kad je veliki ekran da postoje dva reda a kad je mobile size da bude jedan  */}
      <form className="flex flex-col sm:flex-row gap-4">
   {/* kreiranje kontejnera ki ce da sadrzi name, description adress inpute */}
    <div className="flex flex-col gap-4 flex-1">
      <input type="text" placeholder="name" className="border p-3 rounded-lg"  id="name" maxLength='62' minLength='10' required/>
      <textarea type="text" placeholder="description" className="border p-5 rounded-lg" id="description" required/>
      <input type="text" placeholder="address" className="border p-3 rounded-lg"  id="address" required/>
{/* chekmarks radim */}
    <div className="flex gap-6 flex-wrap">
        <div className="flex gap-2">
          <input type="checkbox" id="sale" className="w-5"/>
          <span>Sell</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="rent" className="w-5"/>
          <span>Rent</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="parking" className="w-5"/>
          <span>Parking Spot</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="furnished" className="w-5"/>
          <span>Furnished</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" id="offer" className="w-5"/>
          <span>Offer</span>
        </div>
    </div>
    {/* novi kontejner koji sadrzi kontejnere za broj soba broj kupatila i slicno */}
    <div className="flex flex-wrap gap-6" >
      <div className="flex items-center gap-3">
        <input type="number" id="bedrooms" min='1' max="10" required 
          className="p-3 rounded-lg border-gray-300"
        />
        <p>Beds</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" id="bathrooms" min='1' max="10" required 
          className="p-3 rounded-lg border-gray-300"
        />
        <p>Baths</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" id="regularPrice" min='1' max="10" required 
          className="p-3 rounded-lg border-gray-300"
        />
        <div className="flex flex-col items-center">
        <p>Regular price </p>
        <span className="text-xs">($ / month)</span>
        </div>
        
      </div>

      <div className="flex items-center gap-3">
        <input type="number" id="discountPrice" min='1' max="10" required 
          className="p-3 rounded-lg border-gray-300"
        />
        <div className="flex flex-col items-center">
          <p>Discounted price</p>
          <span className="text-xs">($ / month)</span>
        </div>
        
      </div>
    </div>

    </div>
    {/* NASTAVAK DESNA KOLONA KOJA CE IMATI FUNKCIONALNOST DA UPLOADUJUE SLIKE  */}
    <div className="flex flex-col flex-1 gap-4">
      <p className="font-semibold"> Images:
      <span className="font-normal text-gray-600 ml-2"> The first image will be a cover (max 6)</span>
      </p>

      {/* dio za uploadovanje slika */}
      <div className="flex gap-4">
        <input onChange={(e)=>{setFiles(e.target.files)}} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/*" multiple />
        <button className="p-3 border border-green-700 rounded text-green-700 uppercase hover:shadow-lg disabled:opacity-85">Upload</button>
      </div>
      <button className="bg-slate-600 p-3 rounded-lg text-yellow-50 uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>

    </div>
      </form>

    </main>
  )
}
