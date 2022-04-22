import { Row, Col, Modal } from 'antd';
import axios from "axios";
import { allusersRoute, adduserRoute } from "../utils/APIRoutes";
import { useState, useEffect } from "react";
import { IoPersonAdd, IoPencil ,IoTrash } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {
  const style = { padding: '10px' };
  const [users, setUser] = useState()
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    hpwd: "",
    pwd: "",
    type: "",
  })
  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
  const [modal, setModal] = useState({
    loading: false,
    visible: false,
  })

  const showModal = () => {
    setModal({
      visible: true,
    });
  };

  const handleOk = () => {
    setModal({ loading: true });
    setTimeout(() => {
      setModal({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setModal({ visible: false });
  };

  const getAllUsers = async () => {
    const data = await axios.get(allusersRoute);
    setUser(data.data.protectedUsers)
  }
  useEffect(() => {
    getAllUsers()
  },[]);

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newUser.hpwd === newUser.pwd){
      const { name, email, pwd, type } = newUser;
      const { data } = await axios.post(adduserRoute, {
        name, email, pwd, type
      });
      if (data.status === false) {
        toast.error("Error en el servidor", toastOptions)
        console.log(data.msg)
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions)
        setNewUser({
          name: "",
          email: "",
          hpwd: "",
          pwd: "",
          type: "",
        })
        getAllUsers()
      }
    }else{
      toast.error("Las contraseñas deber coincidir", toastOptions)
    }
  }

  var countUserTb = 0;
  const { visible, loading } = modal;
  return (
    <>
    <Row>
      <Col xs={24} md={14} lg={18}>
        <div style={style}>
          <div className="card">
            <h4>Usuarios</h4>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Nivel</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  users ? (
                    users.map((user) => {
                      countUserTb = countUserTb+1
                      return(
                        <tr key={user.id}>
                          <td>{countUserTb}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                          {
                            user.type === 'Tech' ? (
                              <button className="btn btn-sm"
                                style={{
                                  background: 'linear-gradient(90deg, #ffa866 0%, #d97223 100%)',
                                  color: '#fff'
                                }}
                              >{user.type}</button>
                            ) : user.type === 'Superadmin' ? (
                              <button className="btn btn-sm"
                                style={{
                                  background: 'linear-gradient(90deg, #78beff 0%, #1890ff 100%)',
                                  color: '#fff'
                                }}
                              >{user.type}</button>
                            ) : user.type === 'Admin' ? (
                              <button className="btn btn-sm"
                                style={{
                                  background: 'linear-gradient(90deg, #42ed71 0%, #22b54a 100%)',
                                  color: '#fff'
                                }}
                              >{user.type}</button>
                            ) : (
                              <button className="btn btn-sm"
                                style={{
                                  background: 'linear-gradient(90deg, #7e51ed 0%, #4c24ab 100%)',
                                  color: '#fff'
                                }}
                              >{user.type}</button>
                            )
                          }
                          </td>
                          <td>
                          {
                            user.status === 1 ? (
                              <button className="btn btn-primary btn-sm">Activo</button>
                            ) : (
                              <button className="btn btn-sm">Inactivo</button>
                            )
                          }
                          </td>
                          <td>
                            <button className="btn btn-sm btn-actiontb btn-edit" onClick={(e) => showModal()}><IoPencil/></button>
                            <button className="btn btn-sm btn-actiontb btn-delete" onClick={(e) => showModal()}><IoTrash/></button>
                          </td>
                        </tr>
                      )
                    })
                  ): (<tr><td colSpan={4}>Sin usuarios</td></tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </Col>
      <Col xs={24} md={10} lg={6}>
        <div style={style}>
          <div className="card">
            <h4>Nuevo Usuario</h4>
            <form onSubmit={(event) => handleSubmit(event)}>
              <Row>
                <Col sm={24} lg={12} className="form-group">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" required name="name" onChange={(e)=>handleChange(e)} value={newUser.name}/>
                </Col>
                <Col sm={24} lg={12} className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" required name="email" onChange={(e)=>handleChange(e)} value={newUser.email}/>
                </Col>
                <Col sm={24} lg={12} className="form-group">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" required name="hpwd" onChange={(e)=>handleChange(e)} value={newUser.hpwd}/>
                </Col>
                <Col sm={24} lg={12} className="form-group">
                  <label className="form-label">Repita contraseña</label>
                  <input type="password" className="form-control" required name="pwd" onChange={(e)=>handleChange(e)} value={newUser.pwd}/>
                </Col>
                <Col sm={24} lg={12} className="form-group">
                  <label className="form-label">Nivel</label>
                  <select className="form-control" defaultValue="Asistente" name="type" onChange={(e)=>handleChange(e)}>
                    <option value="Tech">Técnico soporte</option>
                    <option value="Superadmin">Superadmin</option>
                    <option value="Admin">Admin</option>
                    <option value="Asistente">Asistente</option>
                  </select>
                </Col>
                <Col sm={24} lg={24} className="form-group">
                  <button type="submit" className="btn btn-primary btn-icon"><IoPersonAdd/> Crear</button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </Col>
    </Row>
    <Modal
      visible={visible}
      style={{borderRadius:15}}
      title="Title"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <button key="back" className="btn" onClick={handleCancel}>Cancelar</button>,
        <button key="submit" className="btn btn-primary" type="primary" loading={loading} onClick={handleOk} style={{marginLeft:5}}>Actualizar</button>,
      ]}
    >
      <h4>Content modal</h4>
    </Modal>
    <ToastContainer />
    </>
  );
}