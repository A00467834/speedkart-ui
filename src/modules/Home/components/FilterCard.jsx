import React from 'react';
import { Image } from 'react-bootstrap';
import styles from '../styles/FilterCard.module.css';

export const FilterCard = ({ category }) => {
  return (
    <div className={styles.filterCardContainer}>
      <Image className={styles.filterCardImage} src={category.imgUrl} />
      <span>{category.title}</span>
    </div>
  );
};
