import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider'
import axios from 'axios'
import useAxiosPublic from '../hooks/useAxiosPublic';


const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUsers, signUpWithGmail, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUsers(email, password)
            .then((result) => {
                const user = result.user;
                updateUserProfile(data.email, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    }
                    axiosPublic.post('/users/signup', userInfo)
                        .then((res) => {
                            alert("Account creation successful!");
                            document.getElementById('my_modal_5').close();
                            navigate(from, { replace: true });
                        })
                })

            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };

    const handleLogin = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                }
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        alert("Login successful!");
                        document.getElementById('my_modal_5').close();
                        navigate("/");
                    })
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };

    return (
        <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                    <h3 className="font-bold text-lg">Create an Account</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="name"
                            className="input input-bordered"
                            {...register("name", { required: "Name is required" })}
                        />
                    </div>
                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    {/* signup Button */}
                    <div className="form-control mt-6">
                        <input type='submit' value="Signup" className="btn bg-green text-white" />
                    </div>
                    <p className='text-center my-2'>
                        Already have an account?
                        <button
                            onClick={() => document.getElementById('my_modal_5').showModal()}
                            className='underline text-red ml-1'
                        >
                            Login
                        </button>
                    </p>
                    <Link
                        to="/"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >✕</Link>
                </form>
                {/* social signin */}
                <div className="text-center space-x-3 mb-5">
                    <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
                        <FaGoogle />
                    </button>
                </div>
            </div>
            <Modal />
        </div>
    );
}

export default Signup;
