import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req,res,next) =>{
try {
const listing = await Listing.create(req.body);// kreirali smo listing model
//nakon kreiranja vracamo listing
res.status(201).json(listing)


} catch (error) {
    next(error)
}
}

export const deleteListing = async(req,res,next) => {
    const listing = await Listing.findById(req.params.id) // pronadji podatke iz listinga po id-u
    if(!listing){  // ako podaci ne postoji vrati gredku
    return next(errorHandler(404,'Listing not found'))
    }
//ako listing postoji provjeravamo da li je korisnik vlasnik listinga
//provjeravamo da li je id korinsika koji salje zahtjev jednak userRef listinga 
    if(req.user.id !== listing.userRef){
        return next(401,'You can delete only your own listing')
    }
    try{
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('listing is succesffully deleted')
    }catch(error){
        next(error)
    }


}

export const updateListing =async (req,res,next) => {
const listing = await Listing.findById(req.params.id);
if(!listing){
    return next(errorHandler(404,'Listing not exist'))
}
if(req.user.id !== listing.userRef){
    return next(errorHandler(401,'you can only update your own listings'))
}

try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.status(200).json(updatedListing)
} catch (error) {
    next(error);
}

}

export const getListing = async (req, res, next) =>{ 
    try {
       const listing =  await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler(401,'Listing not found'))
    }  
    res.status(200).json(listing)
    } catch (error) {
       console.log(error); 
    }
}

export const getListings = async(req,res,next) => {
try {
    //za paginaciju
    const limit = parseInt(req.query.limit)|| 9; //ako postoji limit ako ne koristi 9
    const startIndex = parseInt(req.query.startIndex) || 0;
    // pisanje querija
    let offer = req.query.offer;
    if(offer === undefined || offer === false){
        offer = {$in:[false, true]} // trazi sve ako je undefined ili ako nije selektovana , sve prikazilet 
    }

    let furnished = req.query.furnished;
    if(furnished === undefined || furnished === false){
        furnished = {$in:[false,true]};
    }

    let parking = req.query.parking;
    if(parking === undefined || parking === false){
        parking = {$in:[false,true]};
    }

    let type = req.query.type;
    if(type === undefined || type === 'all'){
        type = {$in:['sale','rent']};
    }

    //searc term tekst iside bar

    const searchTerm = req.query.searchTerm || '';

    //sortiranje

    const sort = req.query.sort  || 'createdAt'; 
    const order = req.query.order || 'desc'; // odredjivanje redosleda;

    // sad dobijanje liatinga na osnovu queria
    //regex je funkcionalnost pretrazivanj za mongo db $regex  
    const listings = await( Listing.find({
        name:{$regex:searchTerm, $options:'i'}, //'i' nebitno pisem li u pretazuvac mala ili velika slova
        offer,
        furnished,
        parking,
        type,
    }).sort(
        {[sort]:order} //sortiraj podatke po redu koji zadajemo u koliko ga nema 'desc'
    ).limit(limit).skip(startIndex)
    
    
    )
return res.status(200).json(listings);


} catch (error) {
    next(error)
}

}