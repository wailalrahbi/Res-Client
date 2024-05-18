import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  Container,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../Validations/LoginValidation";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Images/logo.png";
import { login } from "../Features/StaffSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation) });

  const user = useSelector((state) => state.staffs.user);
  const isSuccess = useSelector((state) => state.staffs.isSuccess);
  const isError = useSelector((state) => state.staffs.isError);

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  useEffect(() => {
    if (user && isSuccess) {
      alert("Welcome " + user.name);
      navigate("/items");
      console.log("Success", isSuccess);
      console.log(user, " ", isSuccess);
    } else if (isError) {
      alert("Invalid User..");
      console.log("Error", isError);
    }
  }, [user, isSuccess, isError, navigate]);

  const handleSubmit = (formData) => {
    const data = {
      email: formData.email,
      pass: formData.password,
    };

    if (data.email === adminEmail && data.pass === adminPassword) {
      alert("Welcome Admin");
      navigate("/adminHome");
    } else {
      dispatch(login(data));
    }
  };

  return (
    <Container fluid>
      <Row className="form-row">
        <Col md="6" className="column">
          <Form className="div-form" onSubmit={submitForm(handleSubmit)}>
            <div style={{ textAlign: "center" }}>
              <img src={Logo} className="innerLogo" alt="Logo" />
            </div>

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
                {...register("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                {...register("password")}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <p className="error">{errors.password?.message}</p>
            </FormGroup>

            <FormGroup>
              <Link className="forgetPass" to="/">
                Forget Password
              </Link>
            </FormGroup>

            <FormGroup>
              <Button className="button" color="primary" type="submit">
                Submit
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
