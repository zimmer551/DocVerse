import axios from 'axios'
import React, { useEffect } from 'react'

const Homepage = () => {

  const getUserData = async() => {
    try {
      await axios.post("http://localhost:8080/api/v1/user/getUserData", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });  
    } catch (err) {
      console.log("getUserData.js err >> ", err)
    }
  }
  
  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div>Homepage</div>
  )
}

export default Homepage