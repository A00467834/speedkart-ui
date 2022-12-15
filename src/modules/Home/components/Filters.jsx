import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { FilterCard } from './FilterCard';
import axiosWrapper from '../../../apis/axiosCreate';

const categories = [
  {
    title: 'bread',
    imgUrl:
      'https://img.freepik.com/premium-photo/slice-bread-white-background-isolated-with-clipping-path_41722-1877.jpg?w=2000',
  },
  {
    title: 'vegetables',
    imgUrl: 'https://i.pinimg.com/736x/a8/5c/ed/a85ced6807a6912e058381a388ddcf41.jpg',
  },
  {
    title: 'dairy',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/speedkart-ui.appspot.com/o/categories%2Fdiary.webp?alt=media&token=d1331626-fb00-485f-b3f1-7499c244b996',
  },
  {
    title: 'snacks',
    imgUrl: 'https://www.vippng.com/png/detail/207-2076187_snacks-lays-classic-potato-chips.png',
  },
  {
    title: 'beauty',
    imgUrl:
      'https://media.istockphoto.com/id/1249579132/photo/beauty-products-isolated-on-white-background.jpg?s=170667a&w=0&k=20&c=ndY_5Ba5oCQlDXG00MYaK_lPfafSZmVzPoPK1c-1-7k=',
  },
  {
    title: 'bread',
    imgUrl:
      'https://img.freepik.com/premium-photo/slice-bread-white-background-isolated-with-clipping-path_41722-1877.jpg?w=2000',
  },
  {
    title: 'vegetables',
    imgUrl: 'https://i.pinimg.com/736x/a8/5c/ed/a85ced6807a6912e058381a388ddcf41.jpg',
  },
  {
    title: 'dairy',
    imgUrl:
      'https://previews.123rf.com/images/aleksanderdn/aleksanderdn1407/aleksanderdn140700029/30676292-milk-bottles-isolated-on-white-background.jpg',
  },
  {
    title: 'snacks',
    imgUrl: 'https://www.vippng.com/png/detail/207-2076187_snacks-lays-classic-potato-chips.png',
  },
  {
    title: 'beauty',
    imgUrl:
      'https://media.istockphoto.com/id/1249579132/photo/beauty-products-isolated-on-white-background.jpg?s=170667a&w=0&k=20&c=ndY_5Ba5oCQlDXG00MYaK_lPfafSZmVzPoPK1c-1-7k=',
  },
];

export const Filters = () => {
    const getCategories = async () => {
        await axiosWrapper.get(`/Categories`).then((resp) => {
            console.log(resp.data);
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

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
        borderRadius: '20px',
      }}
    >
      {categories.map((category) => (
        <>
          <FilterCard category={category} />
        </>
      ))}
    </Container>
  );
};
