import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaUtensils } from 'react-icons/fa';

const UpdateMenu = () => {
    const item = useLoaderData();
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  
    const onSubmit = async (data) => {
      setLoading(true);
      try {
        const imageFile = new FormData();
        imageFile.append('image', data.image[0]);
  
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: { "Content-Type": "multipart/form-data" }
        });
  
        if (hostingImg.data.success) {
          const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: hostingImg.data.data.display_url
          };
  
          const postMenuItem = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
  
          if (postMenuItem) {
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item Updated Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/manage-items')
          } else {
            throw new Error("Failed to add menu item");
          }
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
      <h2 className='text-2xl font-semibold my-4'>Update this <span className='text-green'>Menu item</span></h2>
      {/* form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              type="text"
              defaultValue={item.name}
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("name", { required: "Recipe name is required" })} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          {/* 2nd Row */}
          <div className='flex items-center gap-4'>
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                className="select select-bordered"
                defaultValue={item.category}
                {...register("category", { required: "Category is required" })}>
                <option disabled value="default">Select a category</option>
                <option value='salad'>Salad</option>
                <option value='pizza'>Pizza</option>
                <option value='dessert'>Dessert</option>
                <option value='soup'>Soup</option>
                <option value='drinks'>Drinks</option>
                <option value='popular'>Popular</option>
              </select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>
            {/* price */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                defaultValue={item.price}
                className="input input-bordered w-full"
                {...register("price", { required: "Price is required" })} />
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>
          </div>
          {/* 3rd row */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Tell words about your recipe"
              defaultValue={item.recipe}
              {...register("recipe", { required: "Recipe details are required" })} />
            {errors.recipe && <p className="text-red-500">{errors.recipe.message}</p>}
          </div>
          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input type="file" className="file-input w-full" {...register("image", { required: "Image is required" })} />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>
          <button className='btn bg-green text-white px-6' disabled={loading}>
            {loading ? "Updating..." : <><FaUtensils />Update Item</>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateMenu
