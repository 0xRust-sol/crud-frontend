"use client"
import { useEffect, useState } from "react";

import Image from "next/image";
import Modal from "./modal";
import EditModal from "./editModal";
import axios from "axios";

export interface IUser {
  name: string,
  birth: string
}

export default function Home() {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [oldData, setOldData] = useState<IUser[]>([]);
  const [oldName, setOldName] = useState<string>('');
  const [oldBirth, setOldBirth] = useState<string>('');

  const onNew = () => {
    setIsModal(true);
  }
  const onDelete = async (e:any) => {
    console.log("Delete Button cliked");
    console.log(e.target.parentElement.parentElement.children[0].innerHTML);
    const name = e.target.parentElement.parentElement.children[0].innerHTML;
    const birth = e.target.parentElement.parentElement.children[1].innerHTML;
    const res =await axios.post("https://curd-backend-phi.vercel.app/deleteOneUser",{
      name: name,
      birth: birth
    });
    console.log("delete",res.data);
    if (res.status == 200) {
      setUsers(res.data);
    }
  }
  
  const onEdit = (e:any) => {
    const oldName = e.target.parentElement.parentElement.children[0].innerHTML;
    const oldBirth = e.target.parentElement.parentElement.children[1].innerHTML;

    setOldName(oldName);
    setOldBirth(oldBirth);
    
    setIsEditModal(true);
  }
  // const onNew = async () => {
  //   console.log("New Button Clicked");
  //   const res = await axios.post("http://localhost:5000/createUser", {
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
                <td className="border-1 p-1">{user.birth}</td>
                <td className="border-1 p-1">
                  <button className="bg-green-300 px-2 py-1 hover:cursor-pointer border-1 mx-1" onClick={(e)=>onEdit(e)}>Edit</button>
                  <button className="bg-green-300 px-2 py-1 hover:cursor-pointer border-1 mx-1" onClick={(e)=>onDelete(e)}>Delete</button>
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
      {isEditModal && <EditModal setIsEditModal={setIsEditModal} setUsers={setUsers} oldName={oldName} oldBirth={oldBirth}/>}    
    </div>
  );
}


