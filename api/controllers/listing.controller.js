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