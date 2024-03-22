import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
    const getTokenFromLocalStorage = localStorage.getItem("user");   //the word token is got from the chrome dev tools application tab 
    //console.log(getTokenFromLocalStorage);
    return getTokenFromLocalStorage?.token === undefined ? children : <Navigate to="/admin" replace={true} />;  //if the token is undefined then the children will be displayed else the user will be redirected to the home page
};