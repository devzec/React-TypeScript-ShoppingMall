import Button from "@material-ui/core/Button";
// Types
import { CarItemType } from "../App";
import Item from "../Item/Item";
// Styles
import { Wapper } from "./CartItem.styles";

type Props = {
  item: CarItemType;
  addToCart: (clikedItem: CarItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>가격: {item.price} 원</p>
        <p>총 합계: {(item.amount * item.price).toFixed(2)} 원</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wapper>
);

export default CartItem;
