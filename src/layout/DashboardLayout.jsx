import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaUser, FaShoppingBag, FaPlusCircle, FaRegUser, FaShoppingCart, FaLocationArrow, FaQuestionCircle } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import Signup from '../components/Signup'
import logo from "/logo.png"
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const sharedLinks = (
    <>
        <li className='mt-3'>
            <Link to='/'>
                <MdDashboard /> Home
            </Link>
        </li>
        <li>
            <Link to='/menu'>
                <FaShoppingCart /> Menu
            </Link>
        </li>
        <li>
            <Link to='/menu'>
                <FaLocationArrow /> Orders Tracking
            </Link>
        </li>
        <li>
            <Link to='/menu'>
                <FaQuestionCircle /> Customer Support
            </Link>
        </li>
    </>
)

const DashboardLayout = () => {
    const {loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    return (
        <div>
            {
                isAdmin ? (<div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                        {/* Page content here */}
                        <div className='flex items-center justify-between mx-4'>
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                                <MdDashboardCustomize />
                            </label>
                            <button className='btn bg-green text-white rounded-full px-6 flex items-center gap-2 sm:hidden'><FaRegUser /> Log out</button>
                        </div>
                        <div className='mt-5 md:mt-2 mx-4'>
                            <Outlet />
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            <li>
                                <Link to='/dashboard' className='flex justify-start mb-3'>
                                    <img src={logo} alt="" className='w-20' />
                                    <span className="badge badge-primary">admin</span>
                                </Link>
                            </li>
                            <hr />
                            <li className='mt-3'>
                                <Link to='/dashboard'><MdDashboard />Dashboard</Link>
                            </li>
                            <li>
                                <Link to='/dashboard'><FaShoppingBag />Manage Bookings</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/add-menu'><FaPlusCircle />Add Menu</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/manage-items'><BiSolidEdit />Manage Items</Link>
                            </li>
                            <li className='mb-3'>
                                <Link to='/dashboard/users'><FaUser />All Users</Link>
                            </li>
                            <hr />
                            {/* Shared nav items */}
                            {
                                sharedLinks
                            }
                        </ul>
                    </div>
                </div>):(<Signup/>)
            }
        </div>
    )
}

export default DashboardLayout
