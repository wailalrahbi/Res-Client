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
import { userSchemaValidation } from "../Validations/RegistValidation";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/StaffSlice";
import { Nav_Admin } from "../Components/Nav_Admin";
export const AddStaffs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.staffs.staff);
  const isLoading = useSelector((state) => state.staffs.isLoading);
  const isSuccess = useSelector((state) => state.staffs.isSuccess);

  const isError = useSelector((state) => state.staffs.isError);

  const {
    register,
    handleSubmit: submitForm, //submitForm will be called when the form is submitted
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");

  const handleSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      await dispatch(registerUser(userData)).unwrap();
      navigate("/");
      alert("Successfully Registered");
    } catch (error) {
      alert(error);
    }
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
                  Name
                </Label>
                <input
                  className="form-control inputcolor"
                  id="name"
                  name="name"
                  placeholder="Your Name"
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
                <Label for="Email" className="smalltext">
                  Email
                </Label>
                <input
                  className="form-control inputcolor"
                  id="Email"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  {...register(
                    "email",
                    {
                      value: email,
                    },
                    {
                      onChange: (e) => {
                        setEmail(e.target.value);
                      },
                    }
                  )}
                />
                <p className="error">{errors.email?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label for="Password" className="smalltext">
                  Password
                </Label>
                <input
                  className="form-control inputcolor"
                  id="Password"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  {...register(
                    "password",
                    {
                      value: pass,
                    },
                    {
                      onChange: (e) => {
                        setPass(e.target.value);
                      },
                    }
                  )}
                />
                <p className="error">{errors.password?.message}</p>
              </FormGroup>

              <FormGroup>
                <Label for="CPassword" className="smalltext">
                  Confirm Password
                </Label>
                <input
                  className="form-control inputcolor"
                  id="CPassword"
                  name="password"
                  placeholder="Confirm Password"
                  type="password"
                  {...register(
                    "confirmPassword",
                    {
                      value: pass,
                    },
                    {
                      onChange: (e) => {
                        setCPass(e.target.value);
                      },
                    }
                  )}
                />
                <p className="error">{errors.confirmPassword?.message}</p>
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
