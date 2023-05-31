import React from "react";
import { useParams } from "react-router-dom";
import products from "../products";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import PageTitle from "../components/PageTitle";
const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  return (
    <>
      <PageTitle title={`${product.name} - Wacom`} />
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stcock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;