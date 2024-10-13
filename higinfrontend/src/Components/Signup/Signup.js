import React from 'react'
import styles from '../Login/LoginCard.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUser } from '../../Usercontext'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LoginCard({ toadd, hide, position }) {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState('')
    const { role } = useUser()
    const navigate = useNavigate();


    console.log(toadd)


    const handleSave = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem('authToken').trim()
            console.log(token)

            const url = process.env.REACT_APP_BACKEND_URL
            console.log(`${url}${toadd}`)
            const response = await axios.post(`${url}${toadd}`,
                {
                    name,
                    username,
                    password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            alert('Successfully Saved')
            hide()


        }
        catch (error) {
            console.error('Error during login', error)

        }
    }



    return (
        <>

            <div className={styles.outer}>
                <h4>Add new:- {position}</h4>
                <Form style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    display: "flex",
                    width: "70%",
                    maxWidth: '400px',
                    flexDirection: "column",
                    // maxWidth: "400px",
                    borderRadius: "10px"
                }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            style={{
                                maxWidth: '300px',
                                width: "80%",
                            }}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                        />
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            style={{
                                maxWidth: '300px',
                                width: "80%",
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
                                maxWidth: '300px',
                                width: "80%"
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                            placeholder="Enter Password"
                        />
                    </Form.Group>

                    <Button
                        onClick={handleSave}
                        variant="primary"
                        type="submit"
                    >
                        Add
                    </Button>
                </Form>
            </div>

        </>
    )
}
