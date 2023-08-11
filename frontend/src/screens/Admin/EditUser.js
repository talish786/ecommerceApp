import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
const EditUser = () => {
  const { id: userId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState("");

  useEffect(() => {}, []);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAdminChange = (e) => {
    setAdmin(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <PageTitle title="Edit User - Chowkbazaar" />
      <h1>Edit User</h1>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
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
            <Form.Group className="text-center p-4">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form.Group>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditUser;
