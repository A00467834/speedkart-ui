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

let interval;

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
      getProducts(null, resp.data);
    });
  }, [userData, dispatch]);

  const getCategories = async () => {
    await axiosWrapper.get('/Categories').then((resp) => {
      setCategories(resp.data);
    });
  };

  const getProducts = async (categoryId, onScreenCartData, searchVal) => {
    let queryString = `/Products${
      categoryId || searchVal
        ? `?${
            categoryId
              ? `${
                  searchVal
                    ? `categoryId=${categoryId}&search=${searchVal}`
                    : `categoryId=${categoryId}`
                }`
              : `search=${searchVal}`
          }`
        : ''
    }`;
    await axiosWrapper.get(queryString).then((resp) => {
      const modifiedProductsData = resp.data.map((product) => {
        const onScreenCartValues = onScreenCartData || onScreenCart;
        const cartProduct = onScreenCartValues?.productQuantities.find(
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
    if (window.localStorage.getItem('sessionId') && !userData.customerId) {
      checkValidSession(window.localStorage.getItem('sessionId'));
    }
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

  const searchOnChange = (ev) => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => {
      getProducts(selectedCatergoryId, onScreenCart, ev.target.value);
      clearInterval(interval);
    }, 2000);
  };

  return userData.customerId ? (
    <div>
      <Filters
        categories={categories}
        selectedFilterId={selectedCatergoryId}
        categoryChange={(val) => setSelectedCategoryId(val)}
      />
      <div style={{ padding: '10px' }}>
        <ProductList searchOnChange={searchOnChange} />
      </div>
      {onScreenCart.totalItems > 0 ? <OnScreenCart onScreenCartItems={onScreenCart} /> : <></>}
    </div>
  ) : (
    <>Not logged in </>
  );
};
