import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftHeader}><h2>Payment and Delivery Control System</h2></div>
      <ul>
        <Link href={'/'}><li>Yared</li></Link>
        <Link href={'/'}><li>Admin</li></Link>       
      </ul>
    </div>
  )
}

export default Header