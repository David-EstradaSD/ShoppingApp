import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitialLoad = true; // this is for the application start to prevent resetting the backend data with the async request

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData()); // this is to (fetch) populate our Cart on initial load
  }, [dispatch]);

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }

    dispatch(sendCartData(cart)); // Redux is able to handle "actions" that return functions (since we're returning a dispatch function in cart-slice.js "sendCartData")
  }, [cart, dispatch]); // we will send this HttpRequest each time our Cart changes

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
