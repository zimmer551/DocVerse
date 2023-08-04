import { Card } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const user = useSelector(state => state.user);

    const handleFinish = () => {

    }
    console.log({user})

  return (  
    <div>
        <div className='row identityCard'>
            <div className='col-lg-4'>
               <p className='label'>Name : {user?.user.name}</p>
                <p><span className='label'>Email id :</span> {user?.user.emailid}</p>
            </div>
            <div className='col-lg-4'>
                <Card
                    title="Identity Card"
                    bodyStyle={{
                        margin: "20px",
                    }}
                    headStyle={{
                        background: "rebeccapurple",
                        color: "white",
                    }}
                    hoverable
                >
                    <img alt="profile" style={{maxHeight: "100%", maxWidth: "100%"}} 
                    src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg?w=740" />
                </Card>
            </div>
            <div className='col-lg-4'></div>
            
        </div>
    </div>
  )
}

export default Profile