import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/style.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ManageOrder } from "./Components/ManageOrder";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Login from "./Components/Login";
import { AdminHome } from "./Components/AdminHome";
import { Items } from "./Components/Menu";
import { AddStaffs } from "./Components/AddStaffs";
import { Management } from "./Components/ManageItems";
import { AddItems } from "./Components/AddItems";
import { Cart } from "./Components/Cart";
import CompletedOrders from "./Components/CompletedOrders";
function App() {
  return (
    <Provider store={store}>
      <>
        <Container fluid>
          <BrowserRouter>
            <Row></Row>
            <Row className="main">
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/items" element={<Items />}></Route>
                <Route path="/adminHome" element={<AdminHome />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/addstaffs" element={<AddStaffs />}></Route>
                <Route path="/management" element={<Management />}></Route>
                <Route path="/additems" element={<AddItems />}></Route>
                <Route path="/manageorder" element={<ManageOrder />}></Route>
                <Route path="/completedOrders" element={<CompletedOrders />} />
                {/* <Route path='/home' element={<Home/>}></Route> */}
                {/* <Route path='/register' element={<Register/>}></Route> */}
              </Routes>
            </Row>
            <Row>{/* <Footer/> */}</Row>
          </BrowserRouter>
        </Container>
      </>
    </Provider>
  );
}

export default App;
