import React, { useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompletedOrders } from "../Features/OrderSlice";
import { Nav_Admin } from "../Components/Nav_Admin";
const CompletedOrders = () => {
  const completedOrders = useSelector((state) => state.orders.completedOrders);
  const status = useSelector((state) => state.orders.completedStatus);
  const error = useSelector((state) => state.orders.completedError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompletedOrders());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error?.message || JSON.stringify(error)}</p>;
  }

  if (!completedOrders || completedOrders.length === 0) {
    return <p>No completed orders available.</p>;
  }

  return (
    <div>
      <Nav_Admin />
      <Container fluid>
        <h3>Completed Orders</h3>
        <Row>
          {completedOrders.map((order) => (
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
                      <CardTitle tag="h6">Total: {order.total}$</CardTitle>
                      <CardTitle tag="h6">Items:</CardTitle>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} - {item.price} - Quantity:{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
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

export default CompletedOrders;
