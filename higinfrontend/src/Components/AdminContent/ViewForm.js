
import React, { useEffect, useState } from 'react';
import styles from '../../Components/Approval/Approval.module.css';
import axios from 'axios';
import TableComponent from '../../Components/Table/Table.rendering';
export default function ViewForm({ managerType }) {
    const [visibleItem, setVisibleItem] = useState(null);
    const [selectedValue, setSelectedValue] = useState({});
    const [list, setList] = useState([]);
    const [showHideState, setShowHideState] = useState({});

   

  
    managerType = 'Account Manager'
    const managerFieldMap = {
        'General Manager': 'GeneralManagerSigned',
        'Store Manager': 'StoreManagerSigned',
        'Purchase Manager': 'PurchaseManagerSigned',
        'Account Manager': 'AccountManagerSigned',
        'isHidden':'isHidden'
    };



    // Fetching data from API
    useEffect(() => {
        const fetchingData = async () => {
            try {
                const token = localStorage.getItem('authToken')
                const url = process.env.REACT_APP_BACKEND_URL
                const resData = await axios.get(`${url}/getdata`,
                    {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      }
                );
                const fetchedList = resData.data;

                const fieldName = managerFieldMap[managerType]; 

                // Set initial state of the checkboxes based on fetched data
                const initialSelectedValue = fetchedList.reduce((acc, item) => {
                    acc[item._id] = item[fieldName] === true ? 'checked' : 'not_checked';


                    return acc;
                }, {});
                const initialShowHideState = fetchedList.reduce((acc, item) => {
                    acc[item._id] = item.isHidden; // Assuming isHidden is a boolean field
                    return acc;
                }, {});
                setList(fetchedList);
                setSelectedValue(initialSelectedValue);
                setShowHideState(initialShowHideState);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchingData();
    },[]);
   

    const showHandler = (index) => {
        setVisibleItem(visibleItem === index ? null : index);
    };
    
    // Handle form submission
  

    // Handle radio input change
    const handleRadioChange = async (e, _id) => {
        e.preventDefault();
    
        // Toggle status based on current state
        const newHiddenState = !showHideState[_id];
    
        try {
            const url = process.env.REACT_APP_BACKEND_URL;
            
            // Send the update request to the backend
            await axios.post(`${url}/verify`, {
                _Id: _id,
                
                isHidden: newHiddenState, 
            });
    
           // Toggle visibility state for hiding/showing the item
            setShowHideState(prevState => ({
                ...prevState,
                [_id]: newHiddenState
            }));
    
            alert(`Document is now ${newHiddenState ? 'Hidden' : 'Visible'} successfully`);
        } catch (err) {
            console.error("Error updating visibility status", err);
        }
    };
    

    console.log("hii...",selectedValue)

    
    const url = process.env.REACT_APP_BACKEND_URL
    return (
        <div className={styles.outer}>
            {list.map((item, index) => {
                const {
                    _id,
                    grinNo,
                    grinDate,
                    gsn,
                    gsnDate,
                    poNo,
                    poDate,
                    partyName,
                    innoviceno,
                    innoviceDate,
                    receivedFrom,
                    lrNo,
                    lrDate,
                    transName,
                    vehicleNo,
                    file,
                    GeneralManagerSigned,
                    PurchaseManagerSigned,
                    StoreManagerSigned,
                    AccountManagerSigned,
                    tableData,
                    createdAt
                } = item;

                // const isAccountManagerEnabled = GeneralManagerSigned && PurchaseManagerSigned && StoreManagerSigned;


                const date = new Date(createdAt);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });

                return (
                    <div key={index} className={styles.show}>
                        <h2 onClick={() => showHandler(index)}>Party Name: {partyName}</h2>
                        <div className={styles.completeBlock} style={{ display: visibleItem === index ? 'block' : 'none' }}>
                            <div className={styles.grinDetails}>
                                <div><label htmlFor=""><h5>GRIN Details</h5></label></div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>GRIN NO.</th>
                                            <th>Date</th>
                                            <th>GSN</th>
                                            <th>Date</th>
                                            <th>P.O. No.</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{grinNo}</td>
                                            <td>{grinDate}</td>
                                            <td>{gsn}</td>
                                            <td>{gsnDate}</td>
                                            <td>{poNo}</td>
                                            <td>{poDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.grinDetails}>
                                <label htmlFor=""><h5>Party Details</h5></label>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Party Name</th>
                                            <th>Party Invoice No.</th>
                                            <th>Received From</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{partyName}</td>
                                            <td>{innoviceno}</td>
                                            <td>{receivedFrom}</td>
                                            <td>{innoviceDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.grinDetails}>
                                <label htmlFor=""><h5>Transport Details</h5></label>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>L.R. No.</th>
                                            <th>Transporter Name</th>
                                            <th>Vehicle No.</th>
                                            <th>L.R. Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{lrNo}</td>
                                            <td>{transName}</td>
                                            <td>{vehicleNo}</td>
                                            <td>{lrDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Material Info */}
                            <div style={{
                                border: "1px solid #ccc",
                                width: "90%",
                                margin: "2% auto",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                padding: "20px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                backgroundColor: "#f9f9f9",
                                fontFamily: "'Arial', sans-serif",
                                fontSize: "16px",
                                lineHeight: "1.6",
                                boxSizing: "border-box",
                                maxWidth: "1200px",
                                overflowWrap: "break-word",
                            }}> <h5 style={{ textAlign: "center" }}>Material List:-</h5>

                                <TableComponent tableData={tableData} />
                            </div>
                            <div className="timestamp" style={{
                                textAlign: 'center',
                                padding: '20px',
                                backgroundColor: '#f0f4f8',
                                borderRadius: '10px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e0e0e0',
                                margin: '20px auto',
                                maxWidth: '400px',
                                fontFamily: "'Roboto', sans-serif",
                                color: '#333',
                            }}>
                                <h1 style={{
                                    fontSize: '24px',
                                    marginBottom: '10px',
                                    color: '#2c3e50',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                }}>Created At</h1>
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#34495e',
                                }}>{formattedDate}</p>
                            </div>
                            {/* <div style={{ width: "100%" }}>
                                <h2>Here is file</h2>
                                {file ? (
                                    <a href={`process.env.LOCAL_HOST_PORT/files/${file}`} target="_blank" rel="noopener noreferrer">
                                        View/Download File
                                    </a>
                                ) : (
                                    <p>No file available</p>
                                )}
                            </div> */}

                            <div style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "20px 0",
                                padding: "15px",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                            }}>
                                <div style={{ textAlign: "center" }}>
                                    <h2 style={{
                                        color: "#007bff",
                                        fontSize: "24px",
                                        marginBottom: "10px",
                                        textDecoration: "underline"
                                    }}>Bill Details</h2>
                                    {file ? (
                                        <a href={`${url}/${file}`} target="_blank" rel="noopener noreferrer" style={{
                                            display: "inline-block",
                                            padding: "10px 20px",
                                            backgroundColor: "#28a745",
                                            color: "#fff",
                                            textDecoration: "none",
                                            borderRadius: "5px",
                                            transition: "background-color 0.3s ease"
                                        }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}>
                                            View/Download File
                                        </a>
                                    ) : (
                                        <p style={{ color: "#dc3545", fontSize: "18px" }}>No file available</p>
                                    )}
                                </div>
                            </div>


                        </div>

                        <div className={styles.sign}
                            // style={{
                            //     width: '100%',
                            //     display: 'flex',
                            //     margin: '5px', padding: '1px',
                            //     backgroundColor: '#3CBC8D',
                            //     justifyContent: 'center',
                            //     alignItems: "center"
                            // }}

                            style={{
                                width: '90%',
                                display: 'flex',
                                margin: '5px',
                                padding: '1px',
                                backgroundColor: '#3CBC8D',
                                justifyContent: 'center',
                                alignItems: "center",
                                border: "1px solid #ccc",
                                borderRadius: "10px"
                            }}
                            >
                            <form style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: "center" }}  >
                                <div className={styles.submission} >
                                    <div>
                                        <label htmlFor="Verify"><h6>General Manager</h6></label>
                                        <input
                                            name={`checkbox-${index}`}
                                            style={{
                                                width: '12px', /* Adjust width */
                                                height: '20px', /* Adjust height */
                                                transform: 'scale(1.5)', /* Increase size */
                                                cursor: 'pointer',
                                                marginLeft: '10px'
                                            }}
                                            value='checked'
                                            type="checkbox"
                                            checked={GeneralManagerSigned}
                                        // checked={selectedValue[_id] === 'checked'}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="Verify"><h6>Store Manager</h6></label>
                                        <input
                                            name={`checkbox-${index}`}
                                            style={{
                                                width: '12px', /* Adjust width */
                                                height: '20px', /* Adjust height */
                                                transform: 'scale(1.5)', /* Increase size */
                                                cursor: 'pointer',
                                                marginLeft: '10px'
                                            }}
                                            value='checked'
                                            type="checkbox"

                                            checked={StoreManagerSigned}

                                        // checked={selectedValue[_id] === 'checked'}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="Verify"><h6>Purchase Manager</h6></label>
                                        <input
                                            name={`checkbox-${index}`}
                                            style={{
                                                width: '12px', /* Adjust width */
                                                height: '20px', /* Adjust height */
                                                transform: 'scale(1.5)', /* Increase size */
                                                cursor: 'pointer',
                                                marginLeft: '10px'
                                            }}
                                            value='checked'
                                            type="checkbox"
                                            checked={PurchaseManagerSigned}
                                        />
                                    </div>
                                    {/* Accountant approvel */}
                                    <div>
                                        <label htmlFor="Verify"><h6>Account Manager</h6></label>
                                        <br />

                                        <input
                                            name={`checkbox-${index}`}
                                            style={{
                                                width: '12px', /* Adjust width */
                                                height: '20px', /* Adjust height */
                                                transform: 'scale(1.5)', /* Increase size */
                                                cursor: 'pointer',
                                                marginLeft: '10px'
                                            }}
                                            value='checked'
                                            type="checkbox"
                                            checked={ AccountManagerSigned}
                                            // onChange={(e) => handleRadioChange(_id, e.target.checked ? 'checked' : 'not-checked')}
                                            // onChange={() => handleRadioChange(_id, 'checked')}
                                            // disabled={!isAccountManagerEnabled} // Disable if conditions are not met
                                        />
                                    </div> <br />
                                    <div>

                                        <button 
                                            style={{
                                                width: '100%',        
                                                maxWidth: '100px',    
                                                margin: '5px',
                                                padding: "0 10px",
                                                minWidth: "80px",      
                                                borderRadius: '15px',
                                                border: '2px solid transparent',
                                                background: '#007bff',
                                                color: 'white',
                                                fontSize: '1rem',     
                                                transition: 'background-color 0.3s ease',  
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
                                          // onChange={() => handleRadioChange(_id, 'checked')}
                                          onClick={(e) => handleRadioChange(e, _id)}

                                        >  {showHideState[_id] ? 'UnHide' : 'Hide'}</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}






