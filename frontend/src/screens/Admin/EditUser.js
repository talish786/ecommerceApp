import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { getUserData, userUpdate } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
const EditUser = () => {
  const { id: userId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.getUserData);
  const { loading, error, user } = userDetails;

  const userUpdateData = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, errorUpdate, successUpdate } = userUpdateData;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setAdmin] = useState("");

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/users");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserData(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAdminChange = (e) => {
    setAdmin(e.target.checked);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdate({ id: user._id, name, email, isAdmin }));
    navigate("/admin/users");
  };
  return (
    <>
      <PageTitle title="Edit User - Chowkbazaar" />
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      <FormContainer>
        <h1>Edit User</h1>
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
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={handleAdminChange}
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
