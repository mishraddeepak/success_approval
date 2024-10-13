import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Admin.module.css'

export default function Admin() {
  return (
    <div className={styles.outerContainer}>
    <video autoPlay muted loop className={styles.videoBackground}>
      <source src="/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div><h1>LogIn as</h1></div>
    <div className={styles.innerContainer}>
      <NavLink to='/view-user'><button >View Users</button></NavLink>
      <NavLink to='/view-form'><button >View Form</button></NavLink>
    </div>
  </div>
  )
}
