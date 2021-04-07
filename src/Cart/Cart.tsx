import CartItem from "../CartItem/CartItem";
// Styles
import { Wrapper } from "./Cart.styles";
// Types
import { CarItemType } from "../App";

type Props = {
  cartItems: CarItemType[];
  addToCart: (clickedItem: CarItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CarItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>장바구니</h2>
      {cartItems.length === 0 ? <p>장바구니가 비어있습니다.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>합계: {calculateTotal(cartItems).toFixed(2)} 원</h2>
    </Wrapper>
  );
};

export default Cart;
