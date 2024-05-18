import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, completeOrder } from "../Features/OrderSlice";
import { Nav_Admin } from "../Components/Nav_Admin";
export const ManageOrder = () => {
  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCompleteOrder = (orderId) => {
    dispatch(completeOrder(orderId));
  };

  const navigateToCompletedOrders = () => {
    navigate("/completedOrders");
  };

  return (
    <div>
      <Nav_Admin />
      <Container fluid>
        <h3>Pending Orders</h3>
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && (
          <p>Error: {error?.message || JSON.stringify(error)}</p>
        )}
        <Button color="primary" onClick={navigateToCompletedOrders}>
          Completed Orders
        </Button>
        <br />
        <br />
        <Row>
          {orders.map((order) => (
            <Col md={12} key={order._id}>
              <Card className="AdminMorder">
                <Row>
                  <Col md={6}>
                    <CardBody
                      style={{
                        margin: "auto",
                        marginTop: "10px",
                        marginLeft: "20px",
                      }}
                    >
                      <CardTitle tag="h5">Table: {order.tableNumber}</CardTitle>
                      <CardTitle tag="h6">Total: ${order.total}</CardTitle>
                      <CardTitle tag="h6">Items:</CardTitle>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} - ${item.price} - Quantity:{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Col>
                  <Col md={6}>
                    <Button
                      color="success"
                      style={{
                        margin: "auto",
                        marginTop: "60px",
                        display: "flex",
                        justifyContent: "center",
                        width: "150px",
                      }}
                      onClick={() => handleCompleteOrder(order._id)}
                    >
                      Done
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ManageOrder;
