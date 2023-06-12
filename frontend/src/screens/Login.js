import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      if (redirect !== null) {
        console.log(redirect);
        navigate(`/${redirect}`);
      } else {
        navigate(`/`);
      }
    }
  }, [navigate, userInfo, redirect]);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <PageTitle title="Login - Wacom" />
      <h1>Sign In</h1>
      {loading && <Loader />}
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {error && <Message variant="danger">{error}</Message>}
          <Form.Group className="mt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="first_name"
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
          <Form.Group className="text-center p-4">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form.Group>
          <Form.Group className="text-center p-2 pb-4 mb-4">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;
