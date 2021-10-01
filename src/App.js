import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://react-udemy-http-fd441-default-rtdb.firebaseio.com/cart.json", { 
      method: "PUT", 
      body: JSON.stringify(cart)
     });
  }, [cart]); // we will send this HttpRequest each time our Cart changes

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
