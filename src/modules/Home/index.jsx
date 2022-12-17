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
import { useNavigate } from 'react-router';
import { setActiveOrders, getActiveOrders } from '../../store/reducers/ordersSlice';
import { Loader } from '../Loader';

let interval;

export const HomePage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const onScreenCart = useSelector(selectOnScreenCart);
  const onScreenActiveOrders = useSelector(getActiveOrders);
  const [categories, setCategories] = useState([]);
  const [selectedCatergoryId, setSelectedCategoryId] = useState(null);

  const getAllActiveOrders = async () => {
    await axiosWrapper.get(`/Order/activeOrder/${userData.customerId}`).then((resp) => {
      dispatch(setActiveOrders(resp.data));
    });
  };

  const getOnScreenCart = useCallback(async () => {
    await axiosWrapper.get(`/Cart/onScreenCart/${userData.customerId}`).then((resp) => {
      dispatch(setOnScreenCart(resp.data));
      getAllActiveOrders();
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
      dispatch(setProducts(modifiedProductsData));
    });
  };

  useEffect(() => {
    if (userData.customerId) getOnScreenCart();
  }, [userData]);

  useEffect(() => {
    if (window.localStorage.getItem('sessionId')) {
      if (!userData.customerId) {
        checkValidSession(window.localStorage.getItem('sessionId'));
      }
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (selectedCatergoryId) {
      getProducts(selectedCatergoryId);
    }
  }, [selectedCatergoryId]);

  const checkValidSession = async (sessionId) => {
    await axiosWrapper
      .post(`Customer/validSession/${sessionId}`)
      .then((resp) => {
        dispatch(setUser(resp.data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate('/login');
        }
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
        categoryChange={(val) => {
          if (val === selectedCatergoryId) {
            setSelectedCategoryId(null);
            getProducts();
          } else {
            setSelectedCategoryId(val);
          }
        }}
      />
      <div style={{ padding: '10px' }}>
        <ProductList searchOnChange={searchOnChange} />
      </div>
      <OnScreenCart
        onScreenCartItems={onScreenCart}
        onScreenActiveOrders={
          onScreenActiveOrders && onScreenActiveOrders.length
            ? onScreenActiveOrders[onScreenActiveOrders.length - 1]
            : {}
        }
      />
    </div>
    ) : (
    <Loader />
  );
};
