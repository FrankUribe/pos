import { Col, Divider, Row } from "antd";
import { IoGrid, IoList, IoPencil, IoSearch, IoTrash } from "react-icons/io5";
import axios from "axios";
import { allitemsRoute, additemRoute, updateitemRoute, deleteitemRoute } from "../utils/APIRoutes";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Items() {
  const [items, setItems] = useState()
  const [view, setView] = useState('list')

  const getAllItems = async () => {
    const data = await axios.get(allitemsRoute);
    setItems(data.data.rows)
  }
  useEffect(() => {
    getAllItems()
  },[]);

  const changeView = (e,style) => {
    const btnsDisplay = document.querySelectorAll('.btnDisplayOpt');
    btnsDisplay.forEach(btn => {
      btn.classList.remove("activeDisplayBtn")
    });
    e.currentTarget.classList.add("activeDisplayBtn");
    setView(style)
  }
  var countItemTb = 0;
  return (
    <>
    <div className="card">
      <Row>
        <Col sm={24} md={12}>
          <h2>Articulos</h2>
        </Col>
        <Col sm={24} md={12} style={{display:"flex", justifyContent:"right", gap:5}}>
          <div className="form-group" style={{padding:0, display:"flex", flexDirection:"row", alignItems:"center", gap:5}}>
            <IoSearch style={{fontSize:20}}/>
            <input type="text" className="form-control" name="searchresult"/>
          </div>
          <button className="btn btn-icon btn-edit btnDisplayOpt activeDisplayBtn" onClick={(e) => changeView(e,'list')}><IoList/></button>
          <button className="btn btn-icon btn-edit btnDisplayOpt" onClick={(e) => changeView(e,'grid')}><IoGrid/></button>
        </Col>
      </Row>
      {
        view === 'list' ? (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Categoria</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Código</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Descuento</th>
                  <th>Precio venta</th>
                  <th>Imagen</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  items ? (
                    items.map((item) => {
                      countItemTb = countItemTb+1
                      return(
                        <tr key={item._id}>
                          <td>{countItemTb}</td>
                          <td>{item.item_category}</td>
                          <td><b>{item.item_name}</b></td>
                          <td>{item.item_description}</td>
                          <td>{item.item_code}</td>
                          <td>{item.item_stock}</td>
                          <td>S/ {item.item_sellprice}</td>
                          <td>% {item.item_discount}</td>
                          <td>S/ {item.item_sellprice - ((item.item_sellprice * item.item_discount)/100)}</td>
                          <td>
                            {
                              item.item_image !== "" ? (
                                <img src={item.item_image} alt={item.item_name} style={{maxWidth:40}}/>
                              ) : (
                                'Sin imagen'
                              )
                            }
                          </td>
                          <td>
                          {
                            item.item_status === 1 ? (
                              <button className="btn btn-primary btn-sm">Activo</button>
                            ) : (
                              <button className="btn btn-sm">Inactivo</button>
                            )
                          }
                          </td>
                          <td>
                            <button className="btn btn-sm btn-actiontb btn-edit" onClick={(e) => editItem(item)}><IoPencil/></button>
                            <button className="btn btn-sm btn-actiontb btn-delete" onClick={(e) => deleteItem(item)}><IoTrash/></button>
                          </td>
                        </tr>
                      )
                    })
                  ): (<tr><td colSpan={4}>Sin usuarios</td></tr>)
                }
              </tbody>
            </table>
          </div>
        ):(
          <>
          <Row>
            {
              items ? (
                items.map((item) => {
                  return(
                    <Col xs={12} sm={8} md={6} lg={6} xl={4} key={item._id} style={{padding:5}}>
                      <div className="card">
                        {
                          item.item_discount === 0 ? (
                            <div className="btnsproducs">
                              <button className="btn btn-sm default"><small>S/ {item.item_sellprice}</small></button>
                            </div>
                          ) : (
                            <div className="btnsproducs">
                              <button className="btn btn-sm discount"><small>(-%{item.item_discount}) S/ {item.item_sellprice - ((item.item_sellprice * item.item_discount)/100)}</small></button>
                              <button className="btn btn-sm false"><small><strike>S/ {item.item_sellprice}</strike></small></button>
                            </div>
                          )
                        }
                        <img src={item.item_image} alt={item.item_name} style={{width:'100%'}}/>
                        <h4 style={{lineHeight:'14px'}}>{item.item_name}</h4>
                        <small>{item.item_description}</small>
                        <Divider style={{margin: '4px 0px'}}/>
                        <Row>
                          <Col xs={24} sm={12} style={{display:'flex', flexDirection:'column'}}><small><b>Estado</b></small><small>{item.item_status}</small></Col>
                          <Col xs={24} sm={12} style={{display:'flex', flexDirection:'column'}}><small><b>Categoria</b></small><small>{item.item_category}</small></Col>
                          <Col xs={24} sm={12} style={{display:'flex', flexDirection:'column'}}><small><b>Stock</b></small><small>{item.item_stock}</small></Col>
                          <Col xs={24} sm={12} style={{display:'flex', flexDirection:'column'}}><small><b>SKU/Codigo</b></small><small>{item.item_code}</small></Col>
                        </Row>
                      </div>
                    </Col>
                  )
                })
              ) : (<center><p>No hay articulos</p></center>)
            }
          </Row>
          </>
        )
      }
    </div>
    </>
  );
}

export default Items;