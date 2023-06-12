import React from "react";
import PageTitle from "../components/PageTitle";
import Message from "../components/Message";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Form } from "react-bootstrap";
import { addCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "@successtar/cogo-toast";
import { removeCart } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const removeProductFromCart = (id) => {
    dispatch(removeCart(id));
    cogoToast.success("Product Delete From Cart");
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <PageTitle title="Cart - Wacom" />
      <Container>
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <Message variant="danger">Your Cart Is Empty</Message>
        ) : (
          <Row>
            <Col md={9}>
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product}>
                    <Row className="justify-content-center">
                      <Col md={2}>
                        <ListGroup.Item
                          as="li"
                          className="d-flex justify-content-between align-items-start borderlessGroupItem"
                        >
                          <div className="">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                height: "100px",
                              }}
                            />
                          </div>
                        </ListGroup.Item>
                      </Col>
                      <Col md={5}>
                        <div style={{ margin: "50px 0px 0px 30px" }}>
                          {item.name}
                        </div>
                      </Col>

                      <Col md={2}>
                        <Form.Control
                          style={{
                            margin: "40px 0px 0px 0px",
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                          }}
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={1}>
                        <div style={{ margin: "50px 0px 0px 0px" }}>
                          ${Math.round(item.price)}
                        </div>
                      </Col>
                      <Col md={1}>
                        <div style={{ margin: "50px 0px 0px 0px" }}>
                          ${Math.round(item.price * item.qty)}
                        </div>
                      </Col>
                      <Col md={1}>
                        <div style={{ margin: "50px 0px 0px 0px" }}>
                          <i
                            className="fa-solid fa-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeProductFromCart(item.product)}
                          ></i>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    Subtotal Of (
                    {cartItems.reduce((a, v) => Math.round((a = a + v.qty)), 0)}
                    ) Items
                  </Card.Title>
                  <Card.Text>
                    $
                    {cartItems.reduce(
                      (a, v) => Math.round((a = a + v.price * v.qty)),
                      0
                    )}
                  </Card.Text>
                </Card.Body>
                <Button onClick={checkoutHandler}>Proceed To Checkout</Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Cart;
