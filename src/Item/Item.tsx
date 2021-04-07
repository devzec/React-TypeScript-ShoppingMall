import Button from "@material-ui/core/Button";
//Types
import { CarItemType } from "../App";
//Styles
import { Wrapper } from "./Item.styles";

// props : 부모(App.tsx)에게서 값을 가져와야함 => CarItemType과 handleAddToCart
// 아무것도 반환하지 않기때문에 void로 표기한다.
type Props = {
  item: CarItemType;
  handleAddToCart: (clickedItem: CarItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>{item.price}원</h3>
    </div>
    <button onClick={() => handleAddToCart(item)}>장바구니 추가</button>
  </Wrapper>
);

export default Item;
