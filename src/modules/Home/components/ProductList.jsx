import React from 'react';
import styles from '../styles/ProductList.module.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    title: 'Tomato',
    imgSrc:
      'https://media.istockphoto.com/id/941825878/photo/tomato-with-slice-isolated-with-clipping-path.jpg?s=612x612&w=0&k=20&c=P3PQlDAxzgx5i1hGCHKEcBy-rZmqn4f5CZPggWnh9yQ=',
  },
  {
    title: 'Onion',
    imgSrc:
      'https://media.istockphoto.com/id/499146498/photo/red-onions.jpg?s=612x612&w=0&k=20&c=jOin68v1FekC7SqV4Tu55EZ9M3adkIyhKL8R-1qQI3I=',
  },
  {
    title: 'Carrot',
    imgSrc: 'https://qph.cf2.quoracdn.net/main-qimg-cea48f1a30c90403005f835ab6e4b986-lq',
  },
  {
    title: 'Potato',
    imgSrc: 'https://5.imimg.com/data5/ON/VX/MY-61713798/vegetable-potato-500x500.jpg',
  },
  {
    title: 'Raddish',
    imgSrc:
      'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/09/daikon-radish-1296x728-header-1296x728.jpg?w=1155&h=1528',
  },
  {
    title: 'Cauliflower',
    imgSrc:
      'https://www.fluentu.com/blog/english/wp-content/uploads/sites/4/2020/02/vegetables-name-in-english-23.jpg',
  },
  {
    title: 'Orange',
    imgSrc: 'https://www.motherjones.com/wp-content/uploads/oranges_netting.jpg',
  },
  {
    title: 'Ketchup',
    imgSrc: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/10/heinz-tomato-ketchup.jpg',
  },
  {
    title: "Hershey's kisses",
    imgSrc: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/10/hershey-kisses.jpg',
  },
  {
    title: 'Butter',
    imgSrc:
      'https://www.eatthis.com/wp-content/uploads/sites/4/2019/10/i-cant-believe-its-not-butter.jpg',
  },
  {
    title: 'Oreo',
    imgSrc: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/10/oreo.jpg',
  },
  {
    title: 'Maggi',
    imgSrc:
      'https://storage.googleapis.com/easygrocery/2018/04/Maggi-2-minutes-Noodles-420gm-6-pack.jpg',
  },
  {
    title: 'Oats',
    imgSrc: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/10/quaker-oats.jpg',
  },
  {
    title: 'bread',
    imgSrc: 'https://i5.walmartimages.ca/images/Enlarge/308/693/6000202308693.jpg',
  },
  {
    title: 'Dettol',
    imgSrc: 'https://cdn.somahar.xyz/product/y7yDN39oZbvMZa3DEypR2655.jpg',
  },
  {
    title: 'bread',
    imgSrc:
      'https://www.bensbakery.ca/sites/default/files/BC_501357_BEN_Holsum-White-570g-0721_A1N1.png',
  },
  {
    title: 'bread',
    imgSrc:
      'https://www.bensbakery.ca/sites/default/files/BC_501357_BEN_Holsum-White-570g-0721_A1N1.png',
  },
];

export const ProductList = (props) => {

  const navigate = useNavigate();

  return (
    <div className={styles.productListContainer}>
      {products.map((product) => (
        <Button onClick={() => navigate('/product')} style={{background: 'transparent'}} className={styles.productCard}>
        <Card >
          <CardMedia component="img" alt="green iguana" height="140" image={product.imgSrc} />
          <CardActions style={{ justifyContent: 'space-between' }}>
            <div>
              <p style={{marginBottom: '0px'}}>{product.title}</p>
              <p style={{fontSize: '12px'}}>500g</p>
            </div>
            <div style={{ display: 'flex' }}>
              <button className={styles.cartModifyBtn}>+</button>
              <span>0</span>
              <button className={styles.cartModifyBtn}>-</button>
            </div>
          </CardActions>
        </Card>
        </Button>
      ))}
    </div>
  );
};
