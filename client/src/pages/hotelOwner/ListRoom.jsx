import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListRoom = () => {

    const [rooms, setRooms] = useState([])
    const { axios, getToken, user, currency} = useAppContext()

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);

    const openDeleteModal = (room) => {
    setRoomToDelete(room);
    setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
    setRoomToDelete(null);
    setDeleteModalOpen(false);
    };

    // Fetch Rooms of the Hotel Owner
    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms/owner', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setRooms(data.rooms)
            }
            else {
                toast.error(data.message)
            }
        
        }catch (error) {
            toast.error(error.message)
        }
    }

        // Toggle Availability of the Room
    const toggleAvailability = async (roomId) => {
        const { data } = await axios.post("/api/rooms/toggle-availability", { roomId }, { headers: { Authorization: `Bearer ${await getToken()}` } })
        if (data.success) {
            toast.success(data.message)
            fetchRooms()
        } else {
            toast.error(data.message)
        }
    }

    //  Delete Room Function
    const deleteRoom = async (roomId) => {
    try {
        const { data } = await axios.delete(`/api/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` }
        })
        if (data.success) {
        toast.success(data.message)
        fetchRooms()
        } else {
        toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
    }

    // Fetch Rooms when user is logged in
    useEffect(() => {
        if (user) {
            fetchRooms()
        }
    }, [user])


  return (
    <div>
      <Title align='left' font='outfit' title='Room Listings' subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.'/>
      <p className='text-gray-500 mt-8'>All Rooms</p>

      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
        <table className='w-full table-auto'>
        <thead className='bg-gray-50'>
            <tr>
                <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                <th className='py-3 px-4 text-gray-800 font-medium'>Price / night</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
            </tr>
        </thead>
        <tbody className='text-sm'>
        {
        rooms.map((item, index)=>(
        <tr key={index}>
            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                {item.roomType}
            </td>
            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                {item.amenities.join(', ')}
            </td>
            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                {currency}{item.pricePerNight}
            </td>
            <td className='py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center'>
                <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                    <input onChange={() => toggleAvailability(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable}/>
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                </label>
                {/* Delete Button */}
                  <button
                    onClick={() => openDeleteModal(item._id)}
                    className='text-red-500 hover:text-red-700 text-xs rounded ml-2'
                  >
                    Delete
                  </button>
            </td>
        </tr>
        ))
        }
        </tbody>
        </table>
      </div>
        {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 z-50">
            <div className="bg-white bg-opacity-2 rounded-md shadow-xl max-w-xs w-full p-4 mx-4">
            <h2 className="text-md font-semibold mb-3 text-center">Confirm Delete</h2>
            <p className="mb-5 text-center text-sm">
                Are you sure you want to delete the room <strong>{roomToDelete?.roomType}</strong>?
            </p>
            <div className="flex justify-center gap-4">
                <button
                onClick={closeDeleteModal}
                className="px-4 py-1 rounded border border-gray-300 hover:bg-blue-100 text-sm" >
                Cancel
                </button>
                <button
                onClick={async () => {
                    await deleteRoom(roomToDelete._id);
                    closeDeleteModal();
                }}
                className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
                >
                Delete
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default ListRoom
