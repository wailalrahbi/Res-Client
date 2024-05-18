import React, { useState } from "react";
import {
  Input,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiMinusSquare } from "react-icons/fi";
import { Navb } from "./Nav";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  submitOrder,
} from "../Features/CartSlice";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [tableNumber, setTableNumber] = useState("");

  const total = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleSubmitOrder = () => {
    if (!tableNumber) {
      alert("Please enter a table number");
      return;
    }

    dispatch(
      submitOrder({ items: cartItems, total: parseFloat(total), tableNumber })
    );
  };

  return (
    <div>
      <Navb />
      <Container fluid>
        <Row>
          <Col md={3}>
            <h2>Cart</h2>
          </Col>
          <Col>
            <Input
              className="tableNumber"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Col md={12} key={item._id}>
                <Card className="cardStyle">
                  <Row>
                    <Col md={4}>
                      <CardImg
                        src={item.pic}
                        alt="Item image"
                        style={{
                          objectFit: "fill",
                          borderRadius: "5%",
                          margin: "auto",
                          height: "170px",
                          width: "150px",
                        }}
                      />
                    </Col>
                    <Col md={5}>
                      <CardBody style={{ margin: "auto", marginTop: "40px" }}>
                        <CardTitle tag="h5">{item.name}</CardTitle>
                        <CardText>
                          $
                          {typeof item.price === "number"
                            ? item.price.toFixed(2)
                            : item.price}
                        </CardText>
                      </CardBody>
                    </Col>
                    <Col style={{ margin: "auto", marginTop: "40px" }}>
                      <Col>
                        <FaRegPlusSquare
                          className="chartIcons"
                          onClick={() =>
                            dispatch(incrementItemQuantity(item._id))
                          }
                        />
                      </Col>
                      <Col style={{ marginLeft: "10px" }}>{item.quantity}</Col>
                      <Col>
                        <FiMinusSquare
                          className="chartIcons"
                          onClick={() =>
                            dispatch(decrementItemQuantity(item._id))
                          }
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <Col md={12}>
              <p>Your cart is empty.</p>
            </Col>
          )}
        </Row>
        {cartItems.length > 0 && (
          <Row>
            <Col>
              <h4>Total: ${total}</h4>
              <Button color="primary" onClick={handleSubmitOrder}>
                Submit Order
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};
