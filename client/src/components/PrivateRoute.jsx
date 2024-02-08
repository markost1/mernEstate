import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

export default function PrivateRoute() {
    // ako postoji current usser onda pokazi djecu ya to koristimo componentu Outlet
    const {currentUser} = useSelector((state) => state.user) 
    // Moramo da usmjeriumo korisnika na sign up page ako 
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}
