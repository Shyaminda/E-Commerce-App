// import { Navigate } from "react-router-dom";

// export const PrivateRoute = ({ children }) => {
//     const getTokenFromLocalStorage = localStorage.getItem("token");   //the word token is got from the chrome dev tools application tab 
//     //console.log(getTokenFromLocalStorage);
//     return getTokenFromLocalStorage !== undefined ? children : <Navigate to="/signIn" replace={true} />;  //".token" then the profile page is not shown  //if the token is not undefined then the children will be displayed else the user will be redirected to the sign in page
// };
//    return getTokenFromLocalStorage?.token !== undefined ? children : <Navigate to="/signIn" replace={true} />;  

import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/signIn" replace={true} />;
};