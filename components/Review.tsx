import React from 'react';
import styles from './Review.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ReviewProps {
    title: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    url: string;
}

const Review: React.FC<ReviewProps> = ({  
    title,
    rating,
    reviewCount,
    imageUrl,
    url
 }) => {
    const router = useRouter();

    const openLinkInNewTab = (url: string) => {
        const newTab = window.open(url, '_blank');
        if (newTab) {
            newTab.focus();
        }
    };

    const stars = Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < rating ? styles.filledStar : styles.emptyStar}>★</span>
    ));

    return (
        <div className={styles.container} onClick={() => openLinkInNewTab(url)}>
            <img src={imageUrl} alt={title} className={styles.image}/>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.rating}>
                    <div className={styles.stars}>{stars}</div>
                    <img src="/yelp.svg" alt="Yelp" className={styles.yelpIcon}/>
                </div>
                <div className={styles.reviewCount}>Based on {reviewCount} reviews</div>
            </div>
        </div>
    );
};

export default Review;
