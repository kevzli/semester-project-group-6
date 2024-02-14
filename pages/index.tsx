import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import PurpleImage from '../public/purple.png';
import HomeImage from '../public/home.jpg';
import { useLoadScript } from "@react-google-maps/api";
import Map from "./map";
import styles from './Home.module.css';

import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { auth } from '../firebase/firebase';

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBffWM5IfZJ35qk-UNXUydS8RQTJpeM9x0",
    libraries: ["places"],
  });

  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (!isLoading && authUser) {
      // router.push('/map');
    }
  }, [authUser, isLoading]);

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/map',
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID
    ]
  };
  
  return(
    <>
      
        <Head>
          <title>Tripify</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
     
      

      <main>
        {/* Hero section */}
        <div className={styles.container}>
          <div className={styles.overlapImage}>
            <Image
              src={PurpleImage}
              alt="purpleDot"
              width={300} 
              height={300}
              layout="fixed"
            />
          </div>
          <div className={styles.textContainer}>
            <h1>Tripify</h1>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: "25px", fontWeight: "400" }}>don’t let your plans die in the chat</p>
            <div className={styles.buttons}>
              <button onClick = {() => setLogin(true)}className={styles.signupButton}>Sign up</button>
            </div>
          </div>
          <div className={styles.container}>
            <Image
              src={HomeImage}
              alt="Person with a bag"
              width={567} 
              height={750}
              layout="fixed"
            />
          </div>
        </div>

        <Dialog onClose={() => setLogin(false)} open={login}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Dialog>
      </main>
    </>
  );
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// 'use client'
// import { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
// import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
// import { useAuth } from '../firebase/auth';
// import { auth } from '../firebase/firebase';
// import styles from './Home.module.css';
// import dynamic from 'next/dynamic'

// const StyledFirebaseAuth = dynamic(() => import('react-firebaseui/StyledFirebaseAuth'), {ssr: false});


// const REDIRECT_PAGE = '/map';

// // Configure FirebaseUI.
// const uiConfig = {
//   signInFlow: 'popup', // popup signin flow rather than redirect flow
//   signInSuccessUrl: REDIRECT_PAGE,
//   signInOptions: [
//     EmailAuthProvider.PROVIDER_ID,
//     GoogleAuthProvider.PROVIDER_ID,
//   ],
// };

// export default function Home() {
//   const { authUser, isLoading } = useAuth();
//   const router = useRouter();
//   const [login, setLogin] = useState(false);

//   // Redirect if finished loading and there's an existing user (user is logged in)
//   useEffect(() => {
//     if (!isLoading && authUser) {
//       router.push(REDIRECT_PAGE);
//     }
//   }, [authUser, isLoading])

//   return ((isLoading || (!isLoading && !!authUser)) ? 
//     <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>
//     :
//     <div>
//       <Head>
//         <title>Expense Tracker</title>
//       </Head>

//       <main>
//         <Container className={styles.container}>
//           <Typography variant="h1">Welcome to Expense Tracker!</Typography>
//           <Typography variant="h2">Add, view, edit, and delete expenses</Typography>
//           <div className={styles.buttons}>
//             <Button variant="contained" color="secondary"
//                     onClick={() => setLogin(true)}>
//               Login / Register
//             </Button>
//           </div>
//           <Dialog onClose={() => setLogin(false)} open={login}>
//             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
//           </Dialog>
//         </Container>
//       </main>
//     </div>
//   )
// }