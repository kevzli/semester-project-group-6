import { React, useEffect, useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
export default function Trips() {

    const [isTripModalOpen, setTripModal] = useState(false);

    const openTripModal = () => {
        setTripModal(!isTripModalOpen);
    }
    
    return (
        <>
            
                <button onClick={openTripModal}>
                    Add Trip
                </button>

                <Dialog open = {isTripModalOpen} onClose = {openTripModal}>
                    <div className="Trip-Container">
                        
                    </div>
                </Dialog>
            
        </>
    )
  

}