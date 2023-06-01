import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import PageTitle from "../components/PageTitle";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  });
  return (
    <>
      <PageTitle title="Wacom" />
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col
            key={product._id}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="mb-4 mt-4"
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
