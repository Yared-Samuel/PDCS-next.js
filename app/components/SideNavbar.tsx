import React from 'react'
import  styles  from './SideNavbar.module.css'
import Link from 'next/link'
import { GoHome } from "react-icons/go";
import { BsCash } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { BiSitemap } from "react-icons/bi";
const SideNavbar = () => {
  return (
    <div className={styles.sideNavbarContainer}>
      <div className={styles.logo}>
        <h1>GGT</h1>
      </div>
      <div className={styles.navs}>
        <ul className='ul'>
          <Link className={styles.navLinks} href={'/'}><GoHome /><li className='lis'>Home </li></Link>
          <Link className={styles.navLinks} href={'/pages/payment'}><BsCash /><li className='lis'>Payments </li></Link>
          <Link className={styles.navLinks} href={'/'}><CiDeliveryTruck /><li className='lis'>Deliveries </li></Link>
          <Link className={styles.navLinks} href={'/'}><PiNewspaperClippingLight /><li className='lis'>Reports </li></Link>          
          <Link className={styles.navLinks} href={'/pages/item'}><BiSitemap /><li className='lis'>Items </li></Link>          
        </ul>
      </div>
    </div>
  )
}

export default SideNavbar
