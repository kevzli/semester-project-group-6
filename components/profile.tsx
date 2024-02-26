import React, { useState } from 'react';
import Image from 'next/image';
import DefUserImg from '../public/AnonUser.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css';
import { useAuth } from '../firebase/auth';

const ProfileSidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const sidebarItems = [
    { name: 'Homepage', href: '/', icon: '🏠' },
    { name: 'Friends', href: '/friends', icon: '👫' },
    // Add other sidebar items as needed
  ];

  return (
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
            alt="Andrew Smith"
            width={50}
            height={50}
          />
          <span className={styles.sidebarProfileName}>Andrew Smith</span>
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
  );
};

export default ProfileSidebar;