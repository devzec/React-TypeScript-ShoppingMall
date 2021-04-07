import { useState } from "react";
import { useQuery } from "react-query";

// ccomponents 컴포넌트
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

// Styles 스타일
import { Wrapper, StyledButton } from "./App.styles";

// Types 타입 정의
// 자동차 아이템 타입
export type CarItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

// api 호출 json 형식으로 받음
// : Promise<CarItemType>  자동차 아이템 타입으로 가져온다는 약속을 정의해야 합니다.
const getProducts = async (): Promise<CarItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  // 장바구니에 필요한 상태 만들기
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CarItemType[]);

  // 데이터를 가져오기위해 데이터를 구조화하여 const를 만든다.
  //     데이터, 로딩중, 에러
  // "useQuery" hook을 호출한다
  // 반환되는 데이터 유형에도 위에서만든 자동차 아이템 타입을 지정을 반드시 해줘야합니다.
  // 모든 항목이 있는 배열이기때문에 배열로 지정을 합니다.
  const { data, isLoading, error } = useQuery<CarItemType[]>(
    "products",
    getProducts
  );

  // 데이터를 얻었는지 확인하기위해 로그를 찍음
  console.log(data);

  //총 항목을 가져옵니다 비어있는 화살표 함수에 null값을 반환시킨다.
  const getTotalItems = (items: CarItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CarItemType) => {
    setCartItems((prev) => {
      // 장바구니에 이미 추가된경우 금액만 올려야함
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      // 장바구니에 항목이 있을때
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CarItemType[])
    );
  };

  //데이터가 로딩 중일때 프로그래스를 반환한다. 데이터를 모두 수신할때까지
  if (isLoading) return <LinearProgress />;
  //오류가 발생했을때
  if (error) return <div>에러가발생했습니다. ㅜㅜ</div>;

  return (
    <Wrapper>
      {/* 서랍만들기 */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
