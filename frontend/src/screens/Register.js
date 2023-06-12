import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <>
      <PageTitle title="Register - Wacom" />
      <h1>Register</h1>
      {loading && <Loader />}
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <Form.Group className="mt-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="text-center p-4">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form.Group>
          <Form.Group className="text-center p-2 pb-4 mb-4">
            Already have an account ?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default Register;
