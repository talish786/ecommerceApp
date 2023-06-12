import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../actions/userActions";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user]);
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
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <>
      <PageTitle title="Profile - Wacom" />
      <h1>Profile</h1>
      {loading && <Loader />}
      <Row>
        <Col xs={12} md={3}>
          <Form onSubmit={submitHandler}>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
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
                Update Profile
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={9}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
