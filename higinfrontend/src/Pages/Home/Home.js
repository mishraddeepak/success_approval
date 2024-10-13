
import React, { useEffect, } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';
import { useUser } from '../../Usercontext';

export default function Home() {
  const { setRole } = useUser();
  // const [isLoggedin, setIsloggedin] = useState(false);

  const handleclick = (role) => {
    setRole(role);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // setIsloggedin(true);
    }
  }, []);

  return (
    <div className={styles.outerContainer}>
      <video autoPlay muted loop className={styles.videoBackground}>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div><h1 style={{color:'#fff',fontSize:'46px'}}>LogIn as</h1></div>
      <div className={styles.innerContainer}>
        <NavLink to='/admin/log-in'><button onClick={() => { handleclick('admin') }}>Admin</button></NavLink>
        <NavLink to='/creat/log-in'><button onClick={() => { handleclick('attendee') }}>Creat</button></NavLink>
        <NavLink to='/purchasemanager/log-in'>
          <button onClick={() => { handleclick('purchasemanager') }}>Purchase Manager</button>
        </NavLink>
        <NavLink to='/storemanager/log-in'>
          <button onClick={() => { handleclick('storemanager') }}>Store Manager</button>
        </NavLink>
        <NavLink to='/generalmanager/log-in'>
          <button onClick={() => { handleclick('generalmanager') }}>General Manager</button>
        </NavLink>
        <NavLink to='/accountmanager/log-in'>
          <button onClick={() => { handleclick('accountmanager') }}>Accountant</button>
        </NavLink>
      </div>
    </div>
  );
}

