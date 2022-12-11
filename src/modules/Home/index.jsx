import React from 'react';
import { Filters } from './components/Filters';
import { ProductList } from './components/ProductList';

export const HomePage = () => {
  return (
    <div>
      <Filters />
      <div style={{ padding: '10px' }}>
        <ProductList />
      </div>
    </div>
  );
};
