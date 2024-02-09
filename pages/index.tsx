import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import PurpleImage from '../public/purple.png';
import HomeImage from '../public/home.jpg';
import { useLoadScript } from "@react-google-maps/api";
import Map from "./map";
import styles from './Home.module.css';

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBffWM5IfZJ35qk-UNXUydS8RQTJpeM9x0",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  
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
              <button className={styles.signupButton}><Link href="/map">Sign up</Link></button>

              <button className={styles.loginButton}><Link href="/map">Login</Link></button>
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
      </main>
    </>
  );
}

