import axios from "axios";
import { useContext, useState } from "react";
import { IUser } from "./page";

function Modal(props: { setIsModal: (t: boolean) => void; setUsers: (data: IUser[]) => void  }) {
  const { setIsModal, setUsers } = props;
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  const onSave = async () => {
    if (name !== "" && birth !== "") {
      const res = await axios.post("http://localhost:5000/createNewUser", {
        name: name,
        birth: birth,
      });
      console.log("response", res );
      if (res.statusText == "OK") {
        setUsers(res.data);
        setIsModal(false);
      }
    } else {
      console.log("input your name and birthday!");
    }
  };

  const onCancel = () => {
    setIsModal(false);
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
export default Modal;
