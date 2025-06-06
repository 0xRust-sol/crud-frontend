import axios from "axios";
import { useContext, useState } from "react";
import { IUser } from "./page";

function EditModal(props: { setIsEditModal: (t: boolean) => void; setUsers: (data: IUser[]) => void; user: IUser }) {
  const { setIsEditModal, setUsers, user } = props;

  const [name, setName] = useState(user.name);
  const [birth, setBirth] = useState(user.birth);

  const onSave = async () => {
    if (name !== "" && birth !== "") {
      const res = await axios.post("https://curd-backend-phi.vercel.app//updateOneUser", {
        id: user._id,
        newName: name,
        newBirth: birth
      });
      console.log("response", res );
      if (res.status == 200) {
        setUsers(res.data);
        setIsEditModal(false);
      }
    } else {
      console.log("input your name and birthday!");
    }
  };

  const onCancel = () => {
    setIsEditModal(false);
  }

  return (
    <div className="justify-self-center mt-6">
      <div>
        <label>Name</label>
        <input
          type="text"
          style={{ border: "1px solid" }}
          className="ml-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <label>Birthday</label>
        <input
          type="text"
          style={{
            border: "1px solid",
          }}
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
      </div>
      <button
        className="bg-green-300 border-1 px-2 py-1 ml-33 mt-2"
        onClick={onSave}
      >
        Save
      </button>
      <button
        className="bg-green-300 border-1 px-2 py-1 ml-1 mt-2"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}
export default EditModal;
