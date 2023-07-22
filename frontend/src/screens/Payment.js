import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/order");
  };
  return (
    <>
      <PageTitle title="Payment - Chowkbazaar" />
      <CheckoutSteps step1 step2 step3 />
      <h1>Shipping</h1>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mt-3">
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check> */}
            </Col>
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

export default Payment;
