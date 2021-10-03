import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// ----- This File is for Creating Custom
// Redux is able to handle "actions" that return functions (since we're returning a dispatch function in cart-slice.js "sendCartData")

export const fetchCartData = () => {
  return async (dispatch) => {
    // Redux allows us to return "async" functions in our actions!
    const fetchData = async () => {
      const response = await fetch(
        "https://react-udemy-http-fd441-default-rtdb.firebaseio.com/cart.json"
      ); // note that 'GET' request is default so don't need to add

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })); // NOTE: we MUST fetch our cart data from the DB as an object which has either the cart items or an empty array so it's not undefined 
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-udemy-http-fd441-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", // with "PUT" requests, Firebase takes the data in the format we sent it in and thus, when we fetch the data, it comes back in the correct format!
          body: JSON.stringify({ // we create a new object that doesn't contain the "changed" property of our Cart Item object when sending it to Firebase
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    } // here to catch any errors since the original sendCartData is async, and thus returns a "promise"
  };
};
