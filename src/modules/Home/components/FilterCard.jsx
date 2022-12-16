import React from 'react';
import { Button, Image } from 'react-bootstrap';
import styles from '../styles/FilterCard.module.css';

export const FilterCard = ({ category, selectedFilterId, categoryChange }) => {
  let selectedStyles = {};
  if (selectedFilterId === category.categoryId) {
    selectedStyles = {
      background: 'black',
      color: 'white',
    };
  }
  return (
    <Button className={styles.filterCardContainer} style={selectedStyles} onClick={() => categoryChange(category.categoryId)}>
      <Image className={styles.filterCardImage} src={category.imageURL} />
      <span>{category.name}</span>
    </Button>
  );
};
