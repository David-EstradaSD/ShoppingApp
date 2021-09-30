import { uiActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cardQuantity = useSelector(state => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cardQuantity}</span>
    </button>
  );
};

export default CartButton;
