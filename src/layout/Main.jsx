import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import '../App.css'
import { AuthContext } from '../contexts/AuthProvider'

const Main = () => {
    const { loading } = useContext(AuthContext);

    return (
        <div className='bg-primaryBG'>
            {
                loading ?
                    <div>
                        <LoadingSpinner />
                    </div> :
                    <div>
                        <Navbar />
                        <div className='min-h-screen'>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
            }

        </div>
    )
}

export default Main;
