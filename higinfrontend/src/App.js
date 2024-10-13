import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SessionManager from './Components/SessionManager.js/activityinactivity';
import { UserProvider } from './Usercontext';
import LoginCard from './Components/Login/LoginCard'
import Home from './Pages/Home/Home'
import PrivateRoute from './Components/Login/private.route'
import Attendee from './Pages/Attendee/Attendee';
import Generalmanager from './Pages/General.anager/Generalmanager';
import Purchasemanager from './Pages/PurchaseManager/Purchasemanager';
import Storemanager from './Pages/StoreManager/Storemanager';
import Accountant from './Pages/AccountantManager/Accountmanager';
import Admin from './Pages/Admin/Admin';
import AddUser from '../src/Components/AdminContent/AddUser'
import ViewForm from '../src/Components/AdminContent/ViewForm'
function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <SessionManager/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin/log-in' element={<LoginCard value={'Admin'} />} />
            <Route path='/creat/log-in' element={<LoginCard value={'Creator'} />} />
            <Route path='/accountmanager/log-in' element={<LoginCard />} />
            <Route path='/storemanager/log-in' element={<LoginCard />} />
            <Route path='/generalmanager/log-in' element={<LoginCard />} />
            <Route path='/purchasemanager/log-in' element={<LoginCard />} />


            <Route
              path='/admin-dashboard'
              element={
                <PrivateRoute  allowedRole="admin">
                  <Admin/> 
                </PrivateRoute>
              }
            />
            <Route
              path='/purchasemanager-dashboard'
              element={
                <PrivateRoute allowedRole="purchasemanager">
                <Purchasemanager/>
                </PrivateRoute>
              }
            />
            <Route
              path='/storemanager-dashboard'
              element={
                <PrivateRoute allowedRole="storemanager">
                 <Storemanager/>
                </PrivateRoute>
              }
            />
            <Route
              path='/generalmanager-dashboard'
              element={
                <PrivateRoute allowedRole="generalmanager">
                  <Generalmanager/>
                </PrivateRoute>
              }
            />
            <Route
              path='/accountmanager-dashboard'
              element={
                <PrivateRoute allowedRole="accountmanager">
                 <Accountant/> 
                </PrivateRoute>
              }
            />
            <Route
              path='/attendee-dashboard'
              element={
                <PrivateRoute allowedRole="attendee">
                 <Attendee/>
                </PrivateRoute>
              }
            />

<Route
              path='/view-user'
              element={
                <PrivateRoute  allowedRole="admin">
                 <AddUser/>
                </PrivateRoute>
              }
            />
<Route
              path='/view-form'
              element={
                <PrivateRoute  allowedRole="admin">
                  <ViewForm/>
                </PrivateRoute>
              }
            />

            <Route path="*" element={<>hii</>} />





          </Routes>
        </Router>
      </UserProvider>

    </>
  );
}
export default App;
