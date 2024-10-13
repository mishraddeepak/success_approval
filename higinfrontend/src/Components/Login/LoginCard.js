import React from 'react'
import styles from './LoginCard.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUser } from '../../Usercontext'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LoginCard({ value, onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')
  const { role } = useUser()
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const url = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(`${url}/log-in/${role}`, {
        username,
        password
      }) 
      if (response.data.token) {
        alert(`You are Logged In `)  //as ${role.charAt(0).toUpperCase() + role.slice(1)}
        localStorage.setItem("authToken",response.data.token)
        localStorage.setItem("userRole", role)

        switch (role) {
          case 'admin':
            navigate('/admin-dashboard')
            break;
          case 'attendee':
            navigate('/attendee-dashboard')
            break;
          case 'purchasemanager':
            navigate('/purchasemanager-dashboard');
            break;
          case 'storemanager':
            navigate('/storemanager-dashboard');
            break;
          case 'generalmanager':
            navigate('/generalmanager-dashboard');
            break;
          case 'accountmanager':
            navigate('/accountmanager-dashboard');
            break;
          default:
            navigate('/')
        }
      }
      

    }
    catch (error) {
     alert(`${error.response.data.message}`)
      console.error('Error during login', error)

    }
  }



  return (
    <>
      <div className={styles.outer}>
        <h2 style={{ margin: "30px 0" }}>Log in as {value}</h2>
        <Form style={{
          border: "1px solid #ccc",
          padding: "15px",
          display: "flex",
          width:"70%",
          maxWidth:'400px',
          flexDirection: "column",
          // maxWidth: "400px",
          borderRadius: "10px"
        }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control 
            required
            minLength={5}
            maxLength={5}

            style={{
              maxWidth:'300px',
              width:"80%",
            }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter UserName"
            />
          </Form.Group> 
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
             style={{
              maxWidth:'300px',
              width:"80%"
            }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Enter Password"
            />
          </Form.Group>

          <Button
            onClick={handleLogin}
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>

    </>
  )
}
