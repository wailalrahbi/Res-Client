import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { Register } from "../Validations/LoginValidation";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/logo.png";
import { productSchemaValidation } from "../Validations/AddProductsValidation";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../Features/MenuSlice";
import { Nav_Admin } from "../Components/Nav_Admin";
export const AddItems = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.staffs.staff);
  // const isLoading = useSelector((state) => state.staffs.isLoading);
  // const isSuccess = useSelector((state) => state.staffs.isSuccess);

  // const isError = useSelector((state) => state.staffs.isError);

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchemaValidation),
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pic, setPic] = useState("");

  const handleSubmit = (data) => {
    const itemData = {
      name: data.name,
      price: data.price,
      pic: data.pic,
    };
    dispatch(addItems(itemData));
    // navigate("/");
    alert("Successfully Registration");

    console.log(data);
  };

  return (
    <>
      <Nav_Admin />
      <Container fluid>
        <Row className="form-row">
          <Col md="6" className="column">
            <Form className="div-form">
              <div style={{ textAlign: "center" }}>
                <img src={Logo} className="innerLogo" />
              </div>

              <FormGroup>
                <Label for="Name" className="smalltext">
                  Name Of The Product
                </Label>
                <input
                  className="form-control inputcolor"
                  id="name"
                  name="name"
                  placeholder="Name Of The Product"
                  type="name"
                  {...register(
                    "name",
                    {
                      value: name,
                    },
                    {
                      onChange: (e) => {
                        setName(e.target.value);
                      },
                    }
                  )}
                />
                <p className="error">{errors.name?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label for="Price" className="smalltext">
                  Price Of The Product
                </Label>
                <input
                  className="form-control inputcolor"
                  id="Price"
                  name="price"
                  placeholder="The Price Of The Product"
                  type="text"
                  {...register(
                    "price",
                    {
                      value: price,
                    },
                    {
                      onChange: (e) => {
                        setPrice(e.target.value);
                      },
                    }
                  )}
                />
                <p className="error">{errors.price?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label for="Pic" className="smalltext">
                  Link Of the Picture
                </Label>
                <input
                  className="form-control inputcolor"
                  id="Pic"
                  name="pic"
                  placeholder="Enter Pic Link"
                  type="text"
                  {...register(
                    "pic",
                    {
                      value: pic,
                    },
                    {
                      onChange: (e) => {
                        setPic(e.target.value);
                      },
                    }
                  )}
                />
                <p className="error">{errors.pic?.message}</p>
              </FormGroup>

              <FormGroup>
                <Button
                  className="button"
                  color="primary"
                  onClick={submitForm(handleSubmit)}
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {/* {isLoggedIn && <Navb />} */}
      </Container>
    </>
  );
};
