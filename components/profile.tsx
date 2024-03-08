import React, { useState, useRef } from 'react';
import Image from 'next/image';
import DefUserImg from '../public/AnonUser.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';
import { useAuth } from '../firebase/auth';
import { updateUserProfileImage } from './user.js';
import {
  Dialog,
  DialogTitle,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";

const ProfileSidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const { authUser, signOut } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileUpload, setProfileUpload] = useState(false);
  const sidebarItems = [
    { name: 'Homepage', href: '/', icon: '🏠' },
    { name: 'Friends', href: '/friends', icon: '👫' },
    // Add other sidebar items as needed
  ];

  const handleProfileImageClick = () => {
    setProfileUpload(true)
  };

  return (
    <> 
    <Dialog open={profileUpload} onClose={() => {
      setProfileUpload(false)
    }}>
          <DialogTitle> Profile Pic Upload</DialogTitle>
          <div className="Image Upload">
            <input
              // value={tripTitle}
              // onChange={(e) => setTripTitle(e.target.value)}
              // placeholder="Trip Title"
              // className="trip-title-input"
            />
            </div>
    </Dialog>
    <div className={styles.profileSidebarContainer}>
      <div 
        className={styles.profileImage}
        onMouseEnter={() => setShowSidebar(true)}
      >
        <Image
          src={DefUserImg}
          alt="User Profile"
          width={50}
          height={50}
        />
      </div>

      <div 
        className={`${styles.sidebar} ${showSidebar ? styles.sidebarVisible : ''}`}
        onMouseLeave={() => setShowSidebar(false)}
      >
        <div className={styles.sidebarProfile}>
          <Image
            src={DefUserImg}
            alt="User Profile"
            width={50}
            height={50}
            onClick = {handleProfileImageClick}
          />
          <span className={styles.sidebarProfileName}>User ID: {authUser?.uid}</span>
        </div>
        <nav className={styles.sidebarNav}>
          {sidebarItems.map((item) => (
            <Link key={item.name} href={item.href} passHref>
              <span className={`${styles.sidebarNavItem} ${router.pathname === item.href ? styles.sidebarNavItemActive : ''}`}>
                <span className={styles.sidebarNavIcon}>{item.icon}</span>
                {item.name}
              </span>
            </Link>
          ))}
          <span onClick={() => signOut()} className={styles.sidebarNavItem}>
            <span className={styles.sidebarNavIcon}>🚪</span>
            Logout
          </span>
        </nav>
      </div>
    </div>
    </>
    
  );
};

export default ProfileSidebar;