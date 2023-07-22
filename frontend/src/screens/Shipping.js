import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <>
      <PageTitle title="Shipping - Chowkbazaar" />
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={city}
              className="form-control"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="number"
              name="postalcode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="text-center p-4">
            <Button type="submit" variant="primary">
              Contine
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
