import { useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../firebase'


export default function CreateListing() {

  const [files, setFiles] = useState({})
  const [formData, setFormData] = useState({
    imageUrls: [],
    name:'Markos',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:0,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
  })
  const [imageUploadError , setImageUploadError] = useState(false);
  const [uploading , setUploading] = useState(false)

  //console.log(files);
  console.log(formData);
  const handleImageSubmit = () =>{
    //kreiranje uslova

    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      setUploading(true)
      setImageUploadError(true)
      const promises = []
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i])) 
        
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls:formData.imageUrls.concat(urls),
        });
        setImageUploadError(false)
        setUploading(false)
        
      }).catch((error)=>{
        setImageUploadError('Image upload failed (2mb Max per image)')
        setUploading(false);
      });
    }else{
      setImageUploadError('You can only upload 6 image per listing')
      setUploading(false)
    }
}
 const storeImage = (file) => {
  return new Promise((resolve,reject)=>{
    const storage = getStorage(app); //kreiranje skladista
    const fileName = new Date().getTime() + file.name; // dajemo posebno ime svakom fajlu koje cuvamo u skladiste
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{ // bez ovoga kod ne radi
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          resolve(downloadURL);
        });
      }
    )
  })
 };

      const handleRemoveImage = (index) =>{
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => //{ // u jesto url pisemo underline kad imam viticaste zagrade sve se brise bez njih radi ok
            i !== index // }
          ),
        })
 };

  const handleChange = (e) =>{

  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
  {/* kad je veliki ekran da postoje dva reda a kad je mobile size da bude jedan  */}
      <form className="flex flex-col sm:flex-row gap-4">
   {/* kreiranje kontejnera ki ce da sadrzi name, description adress inpute */}
    <div className="flex flex-col gap-4 flex-1">
      <input type="text" onChange={handleChange} placeholder="name" className="border p-3 rounded-lg"  id="name" maxLength='62' minLength='10' required value={formData.name}/>
      <textarea type="text" onChange={handleChange} placeholder="description" className="border p-5 rounded-lg" id="description" required value={formData.description}/>
      <input type="text" onChange={handleChange} placeholder="address" className="border p-3 rounded-lg"  id="address" required value={formData.address} />
{/* chekmarks radim */}
    <div className="flex gap-6 flex-wrap">
        <div className="flex gap-2">
          <input type="checkbox" onChange={handleChange} id="sale" className="w-5" checked = {formData.type === "sale"}/>
          <span>Sell</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" onChange={handleChange} id="rent" className="w-5" checked = {formData.type === "rent"}/>
          <span>Rent</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" onChange={handleChange} id="parking" className="w-5" checked={formData.parking}/>
          <span>Parking Spot</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" onChange={handleChange} id="furnished" className="w-5" checked={formData.furnished}/>
          <span>Furnished</span>
        </div>
        <div className="flex gap-2">
          <input type="checkbox" onChange={handleChange} id="offer" className="w-5" checked={formData.offer}/>
          <span>Offer</span>
        </div>
    </div>
    {/* novi kontejner koji sadrzi kontejnere za broj soba broj kupatila i slicno */}
    <div className="flex flex-wrap gap-6" >
      <div className="flex items-center gap-3">
        <input type="number" onChange={handleChange} id="bedrooms" min='1' max="10" required value={formData.bedrooms}
          className="p-3 rounded-lg border-gray-300"
        />
        <p>Beds</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" onChange={handleChange} id="bathrooms" min='1' max="10" required  value={formData.bathrooms}
          className="p-3 rounded-lg border-gray-300"
        />
        <p>Baths</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="number" onChange={handleChange} id="regularPrice" min='10000' max="10000000" required value={formData.regularPrice}
          className="p-3 rounded-lg border-gray-300"
        />
        <div className="flex flex-col items-center">
        <p>Regular price </p>
        <span className="text-xs">($ / month)</span>
        </div>
        
      </div>

      <div className="flex items-center gap-3">
        <input type="number" onChange={handleChange} id="discountPrice" min='1' max="10" required value={formData.discountPrice}
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
        <button disabled={uploading} type="button" onClick={handleImageSubmit} className="p-3 border border-green-700 rounded text-green-700 uppercase hover:shadow-lg disabled:opacity-85">
        {uploading ? 'Uploading...' : 'Upload'}
        </button>
      
      </div>
       <p className="text-red-700">{imageUploadError && imageUploadError}</p>
      {
        formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>{
          return (
            <div key={url} className="flex justify-between p-3 border items-center">
              <img src={url} alt='listing images' className="w-20 h-20 object-cover rounded-lg" />
              <button type="button" onClick={()=>handleRemoveImage(index)} className=" p-3 text-red-500 uppercase hover:opacity-75">Delete</button>
            </div>       
          )
  
        // console.log(url) //vraca url ove
        })
      }
      <button className="bg-slate-600 p-3 rounded-lg text-yellow-50 uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
    
    </div>
      </form>

    </main>
  )
}
