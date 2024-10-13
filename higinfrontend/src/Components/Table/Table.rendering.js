import React from 'react';
import styles from './Table.module.css'; // Ensure you have the necessary CSS module

const TableComponent = ({ tableData}) => {
   
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th style={{ width: '1%' }}>Sr. No.</th>
                    <th style={{ width: '40%' }}>Item</th>
                    <th style={{ width: '50%' }}>Description</th>
                    <th style={{ width: '5%' }}>Quantity No.</th>
                    <th style={{ width: '5%' }}>Quantity in Kgs.</th>
                </tr>
            </thead>
            <tbody> 

                {tableData.map((row, index) => (
                    <tr key={index}>
                       
                        <td>{index+1}</td>
                        <td>{row.item}</td>
                        <td>{row.description}</td>
                        <td>{row.quantityNo}</td>
                        <td>{row.quantityKg}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
