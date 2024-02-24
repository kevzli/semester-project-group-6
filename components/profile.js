import { React, useState } from "react";
import DefUserImg from "../public/AnonUser.png";
import Image from "next/image";
import { Dialog, DialogTitle } from "@mui/material";
import { signOut } from "firebase/auth";
import {useAuth} from '../firebase/auth'
export default function Profile() {
  const {signOut} = useAuth();
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const openDialogue = () => {
    setIsDialogueOpen(!isDialogueOpen);
  };

  const handleClose = () =>{
    setIsDialogueOpen(!isDialogueOpen);
  }

  return (
    <>
      {isDialogueOpen && 
        <Dialog
        open={isDialogueOpen}
        onClose={handleClose}
        >
          <DialogTitle> Enter Profile Information</DialogTitle>
          <button onClick={signOut}>
            Log Out
          </button>

        </Dialog>
      }

      <div className="profile">
        <Image
          src={DefUserImg}
          alt="purpleDot"
          layout="fixed"
          onClick={openDialogue}
        />
      </div>
    </>
  );
}
