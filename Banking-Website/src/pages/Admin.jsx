import React, { useState } from 'react'
import { allUsers,removeUser } from '../services/allApis'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
function Admin() {
const [users, setUsers] = useState([])
const navigate = useNavigate("");
useEffect(() => {
  if(sessionStorage.getItem("admin")){
    getAllUsers()
  }else{
    navigate("/admin-login");
  }
  
}, [users])

    const getAllUsers=async()=>{
        const result = await allUsers()
        setUsers(result.data)
    }
   
    const deleteUser=async(id)=>{
        const res = await removeUser(id);
    }


  return (
    <>
    <Header/>
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
