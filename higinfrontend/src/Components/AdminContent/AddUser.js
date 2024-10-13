import React, { useEffect, useState } from 'react';
import Styles from './Admin.module.css';
import Signup from '../../Components/Signup/Signup'; // Assuming you have a SignIn component
import { useBlocker } from 'react-router-dom';
// import Users from '../../Components/Users/Users';
import axios from 'axios';

export default function Admin() {

  const [add, setadd] = useState('')
  const [users, setUsers] = useState(null)
  const [fetched, setFetched] = useState()
  const [managers, setManagers] = useState([{ _id: 1, username: 5 }])
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState('')
  const [list,setList]=useState('')

  const [reload, setReload] = useState(false);
  const hide = () => {
    setadd('')
  }

  const handleClick = (fetched,y) => {
    setFetched(fetched)
    setShow(!show)
    setList(y)

    // setUsers(<Users url={fetched} />)

  }
  console.log(fetched)
  useEffect(() => {
    const getAllData = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const url = process.env.REACT_APP_BACKEND_URL
        const getData = await axios.get(`${url}${fetched}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        setManagers(getData.data || [])

      } catch (err) {
        console.log(err)
      }
    }
    getAllData()
  }, [fetched, reload])
  const handleAdd = (x, y) => {
    setadd(x)
    setPosition(y)
  }
  const handleDelete = (_id, endpoint) => {
    const postDelete = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const url = process.env.REACT_APP_BACKEND_URL
        console.log(`${url}${endpoint}/delete/${_id}`)
        const res = await axios.delete(`${url}${endpoint}/delete/${_id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        setReload((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
    postDelete()
  }
  return (
    <>


      <div style={{ width: '90vw' }}>
        <h1 style={{ textAlign: "center", margin: "15px", color: "" }}>Admin DashBoard</h1>
        <div className={Styles.outerContainer

        }>
          <div className={Styles.admin}>

            <div className={Styles.name}>Admin</div>
            <div className={Styles.right}>
              <div className={Styles.rightOne} onClick={(e) => handleAdd('/sign-up/admin', 'Admin')}>Add </div>
              <div className={Styles.rightSecond} onClick={() => handleClick('/getAll/admin','Admin')} >Members </div>
            </div>

          </div>
          <div className={Styles.admin}>
            <div className={Styles.name}>Creat</div>
            <div className={Styles.right}>
              <div className={Styles.rightOne} onClick={(e) => handleAdd('/sign-up/attendee', 'Creator')}>Add </div>
              <div className={Styles.rightSecond} onClick={() => handleClick('/getAll/attendee','Creator')} >Members </div>
            </div>

          </div>
          <div className={Styles.admin}>
            <div className={Styles.name}>General Manager</div>
            <div className={Styles.right}>
              <div className={Styles.rightOne} onClick={(e) => handleAdd('/sign-up/generalmanager', 'General Manager')}>Add </div>
              <div className={Styles.rightSecond} onClick={() => handleClick('/getAll/generalmanager','General Manager')}>Members </div>
            </div>

          </div>
          <div className={Styles.admin}>

            <div className={Styles.name}>Purchase Mnager</div>
            <div className={Styles.right}>
              <div className={Styles.rightOne} onClick={(e) => handleAdd('/sign-up/purchasemanager', 'Purchase Manager')}>Add </div>
              <div className={Styles.rightSecond} onClick={() => handleClick('/getAll/purchasemanager','Purchase Manager')}>Members</div>
            </div>
          </div>
          <div className={Styles.admin}>
            <div className={Styles.name}>Store Manager</div>
            <div className={Styles.right}>
              <div className={Styles.rightOne} onClick={(e) => handleAdd('/sign-up/storemanager', 'Store Manager')}>Add </div>
              <div className={Styles.rightSecond} onClick={() => handleClick('/getAll/storemanager','Store Manager')}>Members </div>
            </div>

          </div>
          <div className={Styles.admin}>
            <div className={Styles.name}>Accountant</div>
            <div className={Styles.right}>
              <div className={Styles.rightOne} onClick={(e) => handleAdd('/sign-up/accountmanager', 'Account Manager')}>Add </div>
              <div className={Styles.rightSecond} onClick={() => handleClick('/getAll/accountmanager','Account Manager')}>Members </div>
            </div>
          </div>
          <div className='list' style={{ display: show ? "block" : "none" }}>
            <div style={{display:"flex",justifyContent:"center",color:"black",fontSize:"30px"}}>{list}</div>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
              {managers.map((u, index) => (

                <li key={u._id} style={{
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: "20px",
                  border: "1px solid black",
                  padding:"10px",
                  borderRadius:"5px",
                  backgroundColor:"#2d2d2d",
                  color:"white"
                }}  >
                  <span>{index + 1}.</span>
                  name: &nbsp; {u.name} <br /> username:&nbsp;&nbsp;{u.username} <img 
                  style={{ height: '30px',color:"white",backgroundColor:"white"
                   }} src="/delete.png" alt="no icon" onClick={() => handleDelete(u._id, `${fetched}`)} />
                </li>
              ))}
            </ol>
          </div>
          <div ><Signup toadd={add} hide={hide} position={position} /></div>

        </div>

      </div>

    </>
  );
}
