import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { IoIosAddCircle } from "react-icons/io";
import { Navb } from "../Components/Nav";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../Features/MenuSlice";
import { addItemToCart } from "../Features/CartSlice";

export const Items = () => {
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const addToCart = (item) => {
    dispatch(
      addItemToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        pic: item.pic,
      })
    );
    alert("Product added to cart");
  };

  return (
    <div>
      <Navb />

      <Container fluid>
        <h3>All products</h3>

        <Row>
          {items.map((item) => (
            <Col md={3} key={item._id}>
              <Card className="cardStyle">
                <CardImg
                  alt="Item image"
                  src={item.pic}
                  style={{
                    objectFit: "fill",
                    borderRadius: "5%",
                    margin: "auto",
                    height: "300px",
                    width: "250px",
                  }}
                />
                <CardBody>
                  <CardTitle tag="h5">{item.name}</CardTitle>
                  <CardText>${item.price}</CardText>
                  <Button onClick={() => addToCart(item)} color="success">
                    <IoIosAddCircle
                      style={{ color: "orange", fontSize: "20px" }}
                    />{" "}
                    Add to Cart
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
