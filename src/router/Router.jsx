
import { createBrowserRouter } from "react-router-dom";
import Main from '../layout/Main'
import Home from '../pages/home/Home'
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";

const router = createBrowserRouter([
    //user
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/menu",
                element: <Menu />
            },
            {
                path: "/update-profile",
                element: <UpdateProfile />
            },
            {
                path: "/cart-page",
                element: <CartPage />
            },{
                path:"/process-checkout",
                element: <Payment/>
            }
        ]
    },

    {
        path: "/signup",
        element: <Signup />
    },
    //admin
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'add-menu',
                element: <AddMenu />
            },
            {
                path: 'manage-items',
                element: <ManageItems />
            },
            {
                path: "update-menu/:id",
                element: <UpdateMenu />,
                loader: ({params}) => fetch(`http://localhost:3000/menu/${params.id}`)
            }
        ]
    }
]);


export default router