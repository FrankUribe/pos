import { Row, Col, Modal, Divider, Switch } from 'antd';
import axios from "axios";
import { allusersRoute, adduserRoute, updateuserRoute, deleteuserRoute } from "../utils/APIRoutes";
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
  const [userToEdit, setUserToEdit] = useState({
    id: "",
    name: "",
    email: "",
    pwd: "",
    type: "",
    status: "",
  })

  const [modalcontent, setModalcontent] = useState({})
  const setmodalcontentclean = () => {
    setModalcontent({
      header: 'Título de modal',
      footer: [        
        <button key="back" className="btn" onClick={handleCancel}>Cancelar</button>,
        <button key="submit" className="btn btn-primary" type="primary" onClick={handleOk} style={{marginLeft:5}}>Boton</button>,
      ],
      body: (
        <>
        <h2>Modal</h2>
        <span>Contenido del modal</span>
        </>
      )
    })
  }

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
    setmodalcontentclean()
    setUserToEdit({
      id: "",
      name: "",
      email: "",
      pwd: "",
      type: "",
      status: "",
    })
    setModal({ loading: true });
    setTimeout(() => {
      setModal({ loading: false, visible: false });
    }, 2000);
  };

  const handleCancel = () => {
    setmodalcontentclean()
    setUserToEdit({
      id: "",
      name: "",
      email: "",
      pwd: "",
      type: "",
      status: "",
    })
    setModal({ visible: false });
  };

  const getAllUsers = async () => {
    const data = await axios.get(allusersRoute);
    setUser(data.data.protectedUsers)
  }
  useEffect(() => {
    setmodalcontentclean()
    getAllUsers()
  },[]);

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }
  const handleChangeUserToEdit = (event) => {
    setUserToEdit({ ...userToEdit, [event.target.name]: event.target.value })
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

  const editItem = (user) => {
    const stts = user.status === 1 ? true : false
    setUserToEdit({
      id: user.id,
      name: user.name,
      email: user.email,
      pwd: "",
      type: user.type,
      status: stts
    })
    setModalcontent({
      header: 'Editar Usuario',
      footer: 'edituser',
      body: 'edituser'
    })
    showModal()
  }
  const deleteItem = (user) => {
    setModalcontent({
      header: 'Eliminar cuenta de '+user.name,
      footer: [        
        <button key="back" className="btn" onClick={handleCancel}>Cancelar</button>,
        <button key="submit" className="btn btn-danger" type="primary" onClick={(e) => {deleteUser(user.id)}} style={{marginLeft:5}}>Si, Eliminar</button>,
      ],
      body: 'deleteuser'
    })
    showModal()
  }
  const deleteUser = async (id) => {
    await axios.delete(`${deleteuserRoute}/${id}`);
    getAllUsers()
    handleOk()
  }
  const updateUser = async (id) => {
    const { name, email, pwd, type, status } = userToEdit;
    if (pwd.length >= 1 && pwd.length < 7) {      
      toast.info("La contraseña debe tener como mínimo 8 caracteres", toastOptions)
    }else{
      const { data } = await axios.put(`${updateuserRoute}/${id}`, {
        name, email, pwd, type, status
      })
      if (data.status === false) {
        toast.error("Error en el servidor", toastOptions)
        console.log(data.msg)
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions)
      }
      getAllUsers()
      handleOk()
    }
  }

  var countUserTb = 0;
  const { visible, loading } = modal;
  return (
    <>
    <Row>
      <Col xs={24} md={14} lg={16} xl={18}>
        <div style={style}>
          <div className="card">
            <h4>Usuarios</h4>
            <div className="table-responsive">
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
                              <button className="btn btn-sm btn-actiontb btn-edit" onClick={(e) => editItem(user)}><IoPencil/></button>
                              <button className="btn btn-sm btn-actiontb btn-delete" onClick={(e) => deleteItem(user)}><IoTrash/></button>
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
        </div>
      </Col>
      <Col xs={24} md={10} lg={8} xl={6}>
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
                    <option value="Tech">Tech</option>
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
      title={modalcontent.header}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={modalcontent.footer === 'edituser' ? (
        [        
          <button key="back" className="btn" onClick={handleCancel}>Cancelar</button>,
          <button key="submit" className="btn btn-primary" type="primary" onClick={(e) => {updateUser(userToEdit.id)}} style={{marginLeft:5}}>Actualizar</button>,
        ]
      ):modalcontent.footer}
    >
      {modalcontent.body === 'edituser' ? (
        <Row>
          <Col sm={24} className="form-group">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="name" value={userToEdit.name} onChange={(e) => handleChangeUserToEdit(e)}/>
          </Col>
          <Col sm={24} className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={userToEdit.email} onChange={(e) => handleChangeUserToEdit(e)}/>
          </Col>
          <Col sm={24} className="form-group">
            <label className="form-label">Nivel</label>
            <select className="form-control" name="type" onChange={(e) => handleChangeUserToEdit(e)}>
              <option value={userToEdit.type}>{userToEdit.type} (Actual)</option>
              <option value="Tech">Tech</option>
              <option value="Superadmin">Superadmin</option>
              <option value="Admin">Admin</option>
              <option value="Asistente">Asistente</option>
            </select>
          </Col>
          <Col sm={24}><Divider style={{margin:'8px 0px'}}/></Col>
          <Col sm={24} lg={12} className="form-group">
            <label className="form-label">¿Actualizar contraseña?</label>
            <input type="text" className="form-control" name="pwd" value={userToEdit.pwd} onChange={(e) => handleChangeUserToEdit(e)}/>
          </Col>
          <Col sm={24} lg={12} className="form-group">
            <label className="form-label">Estado</label><br/>
            <Switch
              checked={userToEdit.status}
              checkedChildren=""
              unCheckedChildren=""
              onChange={(e) => {
                setUserToEdit({...userToEdit, status:!userToEdit.status})
              }}
            />
          </Col>
        </Row>
      ) : modalcontent.body === 'deleteuser' ? (
        <h2>¿Esta seguro de eliminar este usuario?</h2>
      ) : (
        <h2>Cargando contenido</h2>
      )}
    </Modal>
    <ToastContainer />
    </>
  );
}