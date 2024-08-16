import React, { useState } from 'react'
import { allUsers,removeUser } from '../services/allApis'
import { useEffect } from 'react'

function Admin() {
const [users, setUsers] = useState([])
useEffect(() => {
  getAllUsers()
}, [users])

    const getAllUsers=async()=>{
        const result = await allUsers()
        setUsers(result.data)
        console.log(result.data)
    }
   
    const deleteUser=async(id)=>{
        const res = await removeUser(id);
    }


  return (
    <>
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <td>Username</td>
                    <td>Email</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
               {users.map((item)=>(

             <tr>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td><button onClick={()=>deleteUser(item._id)} className='btn btn-danger'>Delete</button></td>
            </tr>
             ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Admin
