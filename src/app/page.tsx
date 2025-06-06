"use client"
import { useEffect, useState } from "react";

import Image from "next/image";
import Modal from "./modal";
import EditModal from "./editModal";
import axios from "axios";

export interface IUser {
  _id: string;
  name: string;
  birth: string;
}

export default function Home() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const onNew = () => {
    setIsModal(true);
  }
  const onDelete = async (id: any) => {
    console.log(id);
    const res =await axios.get(`https://curd-backend-phi.vercel.app//deleteOneUser/${id}`);
    console.log("delete",res.data);
    if (res.status == 200) {
      setUsers(res.data);
    }
  }
  
  const onEdit = (user: IUser) => {
    setSelectedUser(user);
    
    setIsEditModal(true);
  }
  // const onNew = async () => {
  //   console.log("New Button Clicked");
  //   const res = await axios.post("https://curd-backend-phi.vercel.app//createUser", {
  //     name: "a",
  //     birth: 10
  //   });
  //   console.log("response => ", res.data);
  // }

  // const getTotalMember = () => {
  //   const totalNumber = 1/2;
  // }


  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get("https://curd-backend-phi.vercel.app/");
      console.log("🚀 ~ getAllUsers ~ res:", res)
      setUsers(res.data)
    }

    getAllUsers();
  }, [])
  
  return (
    <div>
      <table className="mt-10 justify-self-center">
        <thead>
          <tr>
            <th className="border-1 px-1">Name</th>
            <th className="border-1 px-1">Birthday</th>
            <th className="border-1 px-1">Email</th>
            <th className="border-1 px-1">Operation</th>
          </tr>
        </thead>
        <tbody>
          {
            
            users.map((user, i) => (
              <tr key={i}>
                <td className="border-1 p-1 ">{user.name}</td>
                <td className="border-1 p-1">{user.birth}</td>
                <td className="border-1 p-1"></td>
                <td className="border-1 p-1">
                  <button className="bg-green-300 px-2 py-1 hover:cursor-pointer border-1 mx-1"  id={user._id} onClick={()=>onEdit(user)}>Edit</button>
                  <button className="bg-green-300 px-2 py-1 hover:cursor-pointer border-1 mx-1"  id={user._id} onClick={()=>onDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="justify-self-center mt-2">
        <button className="bg-green-300 px-2 py-1 hover:cursor-pointer border-1 ml-66" onClick={onNew}>New</button>
        
      </div>  
      {isModal && <Modal setIsModal={setIsModal} setUsers={setUsers} />}
      {isEditModal && <EditModal setIsEditModal={setIsEditModal} setUsers={setUsers} user={selectedUser!} />}    
    </div>
  );
}


