import React from "react";
import {CircleToBlockLoading} from "react-loadingg";

export default function CustomLoader(){
    return(
        <div className="w-100 h-100  position-fixed d-flex justify-content-center align-items-center" >
            <CircleToBlockLoading size="large"/>
        </div>
    )
}