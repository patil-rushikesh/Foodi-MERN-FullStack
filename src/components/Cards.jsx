/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2';

const Cards = ({ item }) => {
  const { name, image, price, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Add to cart button
  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
      fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
        .then(res => res.json())
        .then(data => {
          if (data._id) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Item added to Cart',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Item Already Added!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: error.message,
            showConfirmButton: true
          });
        });
    } else {
      Swal.fire({
        title: 'Please Login!',
        text: "Without an account, you can't add products to cart!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Signup Now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', { state: { from: location } });
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5" >
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? 'text-rose-500' : 'text-white'}`}
        onClick={handleHeartClick} style={{ zIndex: 10 }}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt={item.name} className="hover:scale-105 transition-all duration-300 md:h-72 overflow-hidden" />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        {/* <p>{item.recipe}</p> */}
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span> {item.price}
          </h5>
          <button className="btn bg-green text-white" onClick={() => handleAddtoCart(item)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
