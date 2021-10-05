import React from "react";
import "./loadingIndicator.css";
import spinner from "../../assets/icons/spinner.gif"


export const LoaderIndicator:React.FC = ()=>{
    return <img src={spinner} alt="Loading please wait" className="loader"></img>
}