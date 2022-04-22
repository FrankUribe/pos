import { Row, Col } from 'antd';
import axios from "axios";
import { allusersRoute } from "../utils/APIRoutes";
import { useState, useEffect } from "react";
const style = { padding: '10px' };

export default function Users() {
  const [users, setUser] = useState()
  const getAllUsers = async() => {
    const data = await axios.get(allusersRoute);
    setUser(data.data.protectedUsers)
  }
  useEffect(() => {
    getAllUsers()
  },[]);
  return (
    <>
    <Row>
      <Col xs={24} md={12} lg={6}>
        <div style={style}>
          <div className="card">
            <h4>Title</h4>
          </div>
        </div>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <div style={style}>
          <div className="card">
            <h4>Title</h4>
          </div>
        </div>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <div style={style}>
          <div className="card">
            <h4>Title</h4>
          </div>
        </div>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <div style={style}>
          <div className="card">
            <h4>Title</h4>
            {
              users ? (
                users.map((user) => {
                  return(
                    <span key={user.id}>{user.name}</span>
                  )
                })
              ):'sin usuarios'
            }
          </div>
        </div>
      </Col>
    </Row>
    </>
  );
}