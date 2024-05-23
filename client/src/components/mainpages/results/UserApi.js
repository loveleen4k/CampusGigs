import axios from "axios";
import { useEffect, useState } from "react";

const UserData = () => {
  const [user, setUser] = useState([]);
  const authToken = localStorage.getItem('accessToken');

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/infor", {
        headers: {
          Authorization: `${authToken}`,
        }
      });
      setUser(res.data); 
      
    } catch (error) {
      console.log("Error fetching user information:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return {
    user: [user, setUser]
  };
};

export default UserData;
