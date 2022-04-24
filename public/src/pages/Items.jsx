import { Col, Row } from "antd";
import { IoGrid, IoList, IoSearch } from "react-icons/io5";

function Items() {
  const setActive = (e) => {
    const btnsDisplay = document.querySelectorAll('.btnDisplayOpt');
    btnsDisplay.forEach(btn => {
      btn.classList.remove("activeDisplayBtn")
    });
    e.currentTarget.classList.add("activeDisplayBtn");
  }
  return (
    <>
    <div className="card">
      <Row>
        <Col sm={24} md={12}>
          <h4>Articulos</h4>
        </Col>
        <Col sm={24} md={12} style={{display:"flex", justifyContent:"right", gap:5}}>
          <div className="form-group" style={{padding:0, display:"flex", flexDirection:"row", alignItems:"center", gap:5}}>
            <IoSearch style={{fontSize:20}}/>
            <input type="text" className="form-control" name="searchresult"/>
          </div>
          <button className="btn btn-icon btn-edit btnDisplayOpt" onClick={(e) => setActive(e)}><IoList/></button>
          <button className="btn btn-icon btn-edit btnDisplayOpt" onClick={(e) => setActive(e)}><IoGrid/></button>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default Items;