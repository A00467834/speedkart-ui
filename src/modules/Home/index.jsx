import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import {Filters} from './components/Filters';
import {ProductList} from './components/ProductList';

export const HomePage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={3} md={3}>
            <Filters />
          </Col>
          <Col xs={9} md={9}>
            <ProductList />
          </Col>
        </Row>
      </Container>
    </>
  );
};
