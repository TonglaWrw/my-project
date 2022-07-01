import React, { useContext } from 'react'
import { AuthContext } from '../../context/Authen'
import { Login } from './Login'
import { Register } from './Register'
export const Navbar = () => {
    const { currentUser , logout } = useContext(AuthContext);
  return (
    <div className='navbar sticky-top navbar navbar-dark bg-dark'>
        <div className='container-fluid'>
            <div className='navbar-brand'>
                Auction
            </div>
            <div className='d-flex'>
                <div className='col'>
                    {currentUser ? (
                    <>
                    <div className='btn btn-outline-light mx-2 disabled'>
                        {currentUser.email}
                    </div>
                    <div onClick={() => logout()} className='btn btn-outline-light mx-2'>
                        Logout
                    </div>
                    </>
                    ) : (
                    <>                        
                        <Login />
                        <Register />
                    </>
                    )}
                    
                </div>
            </div>
        </div>
    </div>
  )
}
