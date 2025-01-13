import React from 'react'
import useMenu from '../../../hooks/useMenu';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  // console.log(menu);
  const axiosSecure = useAxiosSecure();
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`)
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
      <h2 className='text-2xl font-semibold my-4'>Manage All <span className='text-green'>Menu item</span></h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                menu.map((item, index) => (

                  <tr key={index}>
                    <th>
                      {index + 1}
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.name}
                    </td>
                    <td>
                      ${item.price}
                    </td>
                    <td>
                      <Link to={`/dashboard/update-menu/${item._id}`} className="btn btn-ghost btn-xs bg-orange-500 text-white"><FaEdit /></Link>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs text-red"><RiDeleteBin5Fill /></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageItems
