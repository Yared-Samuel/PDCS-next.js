import React from 'react'
import  styles  from './SideNavbar.module.css'
import Link from 'next/link'
const SideNavbar = () => {
  return (
    <div className={styles.sideNavbarContainer}>
      <div className={styles.logo}>
        <h1>GGT</h1>
      </div>
      <div className={styles.navs}>
        <ul className='ul'>
          <Link className={styles.navLinks} href={'/'}><li className='lis'>Home </li></Link>
          <Link className={styles.navLinks} href={'/'}><li className='lis'>Payments </li></Link>
          <Link className={styles.navLinks} href={'/'}><li className='lis'>Deliveries </li></Link>
          <Link className={styles.navLinks} href={'/'}><li className='lis'>Reports </li></Link>          
        </ul>
      </div>
    </div>
  )
}

export default SideNavbar
