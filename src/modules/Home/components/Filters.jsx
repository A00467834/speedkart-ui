import React from 'react';
import { Container } from 'react-bootstrap';
import { FilterCard } from './FilterCard';

export const Filters = ({categories, selectedFilterId, categoryChange}) => {

  return (
    <Container
      style={{
        padding: 0,
        display: 'flex',
        maxWidth: '100vw',
        overflowX: 'scroll',
        position: 'sticky',
        top: 0,
        background: 'white',
        borderBottom: '1px solid black',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
      }}
    >
      {categories.map((category) => (
        <>
          <FilterCard category={category} selectedFilterId={selectedFilterId} categoryChange={categoryChange} />
        </>
      ))}
    </Container>
  );
};
