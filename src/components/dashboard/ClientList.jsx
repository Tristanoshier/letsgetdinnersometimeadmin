import React from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const ClientList = () => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  // const createUser = async () => {
  //   const newUser = {
  //     firstName: newFirstName,
  //     lastName: newLastName,
  //     email: newEmail,
  //   };
  //   await addDoc(usersCollectionRef, newUser);
  // };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsers();
  // }, []);

  s;
  return <div>ClientList</div>;
};
