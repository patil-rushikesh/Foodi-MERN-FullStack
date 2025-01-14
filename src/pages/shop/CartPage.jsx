import React, { useContext, useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom'; // Added import for Link

const CartPage = () => {
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    // Calculate price
    const calculatePrice = (item) => {
        return item.price * item.quantity;
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            fetch(`http://localhost:3000/carts/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ quantity: item.quantity - 1 })
            })
                .then(res => res.json())
                .then(data => {
                    const updatedCart = cartItems.map(cartItem => {
                        if (cartItem._id === item._id) {
                            return { ...cartItem, quantity: cartItem.quantity - 1 };
                        }
                        return cartItem;
                    });
                    setCartItems(updatedCart);
                    refetch();
                })
                .catch(error => console.error("Error updating cart item:", error));
        } else {
            alert("Item can't be zero");
        }
    };

    const handleIncrease = (item) => {
        fetch(`http://localhost:3000/carts/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        })
            .then(res => res.json())
            .then(data => {
                const updatedCart = cartItems.map(cartItem => {
                    if (cartItem._id === item._id) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                    }
                    return cartItem;
                });
                setCartItems(updatedCart);
                refetch();
            })
            .catch(error => console.error("Error updating cart item:", error));
    };

    // Calculate total price
    const cartSubTotal = cartItems.reduce((total, item) => {
        return total + calculatePrice(item);
    }, 0);

    const orderTotal = cartSubTotal;

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your item has been deleted.", "success");
                        }
                        refetch();
                    })
                    .catch(error => console.error("Error deleting cart item:", error));
            }
        });
    };

    return (
        <div className='section-container'>
            {/* Banner */}
            <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
                <div className="py-36 flex flex-col justify-center items-center gap-8">
                    <div className="space-y-7 px-4">
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
                            Items Added to The <span className='text-green'>Cart</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Table or Empty Cart */}
            {cart.length > 0 ? (
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* Head */}
                            <thead className='bg-green text-white rounded-sm'>
                                <tr>
                                    <th>#</th>
                                    <th>Food</th>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-medium'>{item.name}</td>
                                        <td>
                                            <button className='btn btn-xs p-3' onClick={() => handleDecrease(item)}>-</button>
                                            <input type="number" value={item.quantity} onChange={() => console.log(item.quantity)} className='w-10 mx-2 text-center overflow-hidden appearance-none' />
                                            <button className='btn btn-xs p-3' onClick={() => handleIncrease(item)}>+</button>
                                        </td>
                                        <td>${calculatePrice(item).toFixed(2)}</td>
                                        <th>
                                            <button className="btn btn-ghost text-red btn-xs" onClick={() => handleDelete(item)}><FaTrash /></button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* customer Details */}
                    <div className='my-12 flex flex-col md:flex-row justify-between items-start'>
                        <div className='md:w-1/2 space-y-3'>
                            <h3 className='font-medium'>Customer Details</h3>
                            <p>Name : {user.displayName}</p>
                            <p>Email : {user.email}</p>
                            <p>User_Id : {user.uid}</p>
                        </div>
                        <div className='md:w-1/2 space-y-3'>
                            <h3 className='font-medium'>Shopping Details</h3>
                            <p>Total Items : {cart.length}</p>
                            <p>Total Price : ${orderTotal.toFixed(2)}</p>
                            <Link to='/process-checkout'>
                                <button className='btn bg-green text-white'>Proceed Checkout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='text-center mt-20'>
                    <p>Cart is Empty. Please add products</p>
                    <Link to="/menu">
                        <button className='btn bg-green text-white mt-3'>Back to Menu</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
