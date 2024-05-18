import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { Nav_Admin } from "../Components/Nav_Admin";

export const AdminHome = () => {
  const navigate = useNavigate();

  const addEmployee = () => {
    navigate("/addstaffs");
  };

  const handleManageProduct = () => {
    navigate("/management");
    // alert("Show Manage Product");
  };

  const handleManageOrder = () => {
    navigate("/manageorder");
    // alert("Manage Order");
  };
  const handleAddItems = () => {
    navigate("/additems");
    // alert("Show Manage Product");
  };

  return (
    <>
      <Nav_Admin />

      <Container>
        <Row className="textcenter">
          <Col>
            <h1 className="connectionKitchen">
              Connection <span className="spamkitchen">Kitchen</span>
            </h1>
          </Col>
        </Row>
      </Container>
      <Container className="d-flex align-items-center justify-content-center h-100">
        <Row>
          <Col className="text-center">
            <Button
              color="orange" // Set color to orange
              onClick={handleManageProduct}
              size="lg"
              className="square-button"
            >
              <h3>Manage Products</h3>
            </Button>
          </Col>
          <Col className="text-center">
            <Button
              color="orange" // Set color to orange
              onClick={handleManageOrder}
              size="lg"
              className="square-button"
            >
              <h3>Manage Orders</h3>
            </Button>
          </Col>
          <Col className="text-center">
            <Button
              color="orange" // Set color to orange
              onClick={handleAddItems}
              size="lg"
              className="square-button"
            >
              <h3>Add Items</h3>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
