import React, { useCallback } from 'react';
import { Filters } from './components/Filters';
import { ProductList } from './components/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, selectOnScreenCart } from '../../store/reducers/cartReducer';
import { getUser, setUser } from '../../store/reducers/authSlice';
import { setCart, setOnScreenCart } from '../../store/reducers/cartReducer';
import { setProducts } from '../../store/reducers/productsSlice';
import { useEffect } from 'react';
import { OnScreenCart } from '../Cart/components/OnScreenCart';
import axiosWrapper from '../../apis/axiosCreate';
import { useState } from 'react';

export const HomePage = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const onScreenCart = useSelector(selectOnScreenCart);
  const [categories, setCategories] = useState([]);
  const [selectedCatergoryId, setSelectedCategoryId] = useState(null);

  const getOnScreenCart = useCallback(async () => {
    await axiosWrapper.get(`/Cart/onScreenCart/${userData.customerId}`).then((resp) => {
      dispatch(setOnScreenCart(resp.data));
      getCategories();
    });
  }, [userData, dispatch]);

  const getCategories = async () => {
    await axiosWrapper.get('/Categories').then((resp) => {
      setCategories(resp.data);
      setSelectedCategoryId(resp.data[0].categoryId);
    });
  };

  const getProducts = async (categoryId) => {
    await axiosWrapper.get(`/Products/${categoryId}`).then((resp) => {
      const modifiedProductsData = resp.data.map((product) => {
        const cartProduct = onScreenCart.productQuantities.find(
          (prod) => prod.productId === product.productId,
        );
        if (cartProduct) {
          return { ...product, quantity: cartProduct.quantity };
        }
        return { ...product, quantity: 0 };
      });
      console.log(onScreenCart, 'onScreenCart');
      dispatch(setProducts(modifiedProductsData));
    });
  };

  useEffect(() => {
    if (userData.customerId) getOnScreenCart();
  }, [userData]);

  useEffect(() => {
    // getCategories();
    if (window.localStorage.getItem('sessionId') && !userData.customerId) {
      checkValidSession(window.localStorage.getItem('sessionId'));
    }
    // getOnScreenCart();
    // getProducts();
  }, []);

  useEffect(() => {
    if (selectedCatergoryId) {
      getProducts(selectedCatergoryId);
    }
  }, [selectedCatergoryId]);

  const checkValidSession = async (sessionId) => {
    await axiosWrapper.post(`Customer/validSession/${sessionId}`).then((resp) => {
      dispatch(setUser(resp.data));
    });
  };

  return userData.customerId ? (
    <div>
      <Filters
        categories={categories}
        selectedFilterId={selectedCatergoryId}
        categoryChange={(val) => setSelectedCategoryId(val)}
      />
      <div style={{ padding: '10px' }}>
        <ProductList />
      </div>
      {onScreenCart.totalItems > 0 ? <OnScreenCart onScreenCartItems={onScreenCart} /> : <></>}
    </div>
  ) : (
    <>Not logged in </>
  );
};
