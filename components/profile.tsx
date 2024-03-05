import React, { useState, useRef } from 'react';
import Image from 'next/image';
import DefUserImg from '../public/AnonUser.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';
import { useAuth } from '../firebase/auth';
import { updateUserProfileImage } from './user.js';

const ProfileSidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const { authUser, signOut } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sidebarItems = [
    { name: 'Homepage', href: '/', icon: '🏠' },
    { name: 'Friends', href: '/friendList', icon: '👫' },
    { name: 'Trips', href: '/userTrips', icon: '✈️' },
    // Add more items as needed
  ];

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (authUser && authUser['uid']) {
      updateUserProfileImage(authUser['uid'], file).then(() => {
        console.log('Profile image updated');

      }).catch(error => {
        console.error('Error updating profile pic', error);
      });
    }
  };

  return (
    <div className={styles.profileSidebarContainer}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div 
        className={styles.profileImage}
        onMouseEnter={() => setShowSidebar(true)}
        onClick={handleProfileImageClick}
      >
        <Image
          src={authUser?.['profilePicture'] || DefUserImg.src}
          alt={authUser?.['name'] || "User Profile"}
          width={50}
          height={50}
        />
      </div>

      {showSidebar && (
        <div className={`${styles.sidebar} ${showSidebar ? styles.sidebarVisible : ''}`}>
          <div className={styles.sidebarProfile}>
            <Image
              src={authUser?.['profilePicture'] || DefUserImg.src}
              alt={authUser?.['name'] || "User Profile"}
              width={50}
              height={50}
            />
            <span className={styles.sidebarProfileName}>{authUser?.['name'] || "New User"}</span>
          </div>
          <nav className={styles.sidebarNav}>
            {sidebarItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <a className={`${styles.sidebarNavItem} ${router.pathname === item.href ? styles.sidebarNavItemActive : ''}`}>
                  <span className={styles.sidebarNavIcon}>{item.icon}</span>
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          <span onClick={signOut} className={styles.sidebarNavItem}>
            <span className={styles.sidebarNavIcon}>🚪</span>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;