import React from 'react';
import styles from './Review.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@mui/base';
import { push, set } from 'firebase/database';
import {ActivityInfo} from '../CustomTypes'


const Review: React.FC<ActivityInfo> = ({  
    name,
    rating,
    reviewCount,
    imageUrl,
    url,
    tripId
 }) => {
    const router = useRouter();

    const openLinkInNewTab = (url: string) => {
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.focus();
        }
    };

    const addActivity = () => {
        
    }

    const stars = Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? styles.filledStar : styles.emptyStar}>★</span>
    ));

    return (
        <div className={styles.container} onClick={() => openLinkInNewTab(url)}>
            <img src={imageUrl} alt={name} className={styles.image}/>
            <div className={styles.content}>
                <h2 className={styles.title}>{name}</h2>
                <div className={styles.rating}>
                    <div className={styles.stars}>{stars}</div>
                    <img src="/yelp.svg" alt="Yelp" className={styles.yelpIcon}/>
                </div>
                <div className={styles.reviewCount}>Based on {reviewCount} reviews</div>
            </div>
            <Button onClick={addActivity} className = {styles.button}>+</Button>
        </div>
    );
};

export default Review;
