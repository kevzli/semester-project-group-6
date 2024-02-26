import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import ProfileSidebar from '../components/profile';
import Trips from '../components/trip'
import useAuth from '../firebase/auth'
import { useEffect } from 'react';
import useFirebaseAuth from '../firebase/auth';
import router from 'next/router';
import Trending from '../components/Trending'


export default function Dashboard() {
    const {authUser, isLoading} = useAuth();
    useEffect(() => {
        if (!isLoading && !authUser) {
            router.push('/');
        }
    })
    
    return (
        <>
        <Head>
            <title>Dashboard</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <ProfileSidebar/>
            <Trips/>
            <Trending/>
        </main>
        </>
    )

    

}