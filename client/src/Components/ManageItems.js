import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  CardImg,
  ModalFooter,
  Input,
  ModalBody,
  ModalHeader,
  Modal,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItems, deleteItems, updateItems } from "../Features/MenuSlice";
import { Nav_Admin } from "../Components/Nav_Admin";
export const Management = () => {
  const items = useSelector((state) => state.items.items);

  let [modal, setModal] = useState(false);
  let [price, setPrice] = useState("");
  let [name, setName] = useState("");
  let [postid, setItemID] = useState("");

  const toggle = (price, name, pid) => {
    setModal(!modal);
    setName(name);
    setPrice(price);
    setItemID(pid);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getItems());
  }, [items]);

  const handleUpdate = () => {
    const pdata = {
      name: name,
      price: price,
      pid: postid,
    };
    dispatch(updateItems(pdata));
    dispatch(getItems());
    navigate("/management");
  };

  const handleDelete = (postid) => {
    dispatch(deleteItems(postid));
    navigate("/management");
  };

  return (
    <>
      <Nav_Admin />
      <Container>
        <br />
        <Row>
          <Col md={6}>
            <h3>MANAGE PRODUCT</h3>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Link className="addProduct" to="/addItems">
                ADD NEW PRODUCT
              </Link>
            </FormGroup>
          </Col>
        </Row>
        {items.map((item) => (
          <Row className="itemsRow" key={item._id}>
            <Col md={3}>
              <CardImg
                alt="Item image"
                src={item.pic}
                style={{
                  objectFit: "fill",
                  borderRadius: "5%",
                  flex: "display",
                  marginTop: "25px",
                  marginLeft: "25px",
                  justifyContent: "center",
                  height: "150px",
                  width: "150px",
                }}
              />
            </Col>
            <Col
              md={4}
              style={{
                flex: "display",
                marginTop: "45px",
                marginLeft: "25px",
              }}
            >
              <h3>{item.name}</h3>

              <h4>{item.price}</h4>
            </Col>
            <Col>
              <Row
                style={{
                  flex: "display",
                  marginTop: "80px",
                  marginLeft: "25px",
                }}
              >
                <Col>
                  <FormGroup>
                    <Link
                      className="updateProduct"
                      onClick={() => toggle(item.price, item.name, item._id)}
                    >
                      Update
                    </Link>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Link
                      color="danger"
                      className="deleteProduct"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Link>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader className="foot" toggle={toggle}>
            Update The Item
          </ModalHeader>
          <ModalBody className="foot">
            <Input
              id="name"
              name="name"
              type="textarea"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />

            <Input
              id="share"
              name="share"
              type="textarea"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter className="foot">
            <Button
              color="success"
              onClick={() => {
                handleUpdate();
                toggle();
              }}
            >
              UPDATE
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};
