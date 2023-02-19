export type ProductProps = {
  id: string;
  name: string;
  price: number;
  type: string;
  imgUrl: string;
  amount: number;
  description: string;
  discount?: number;
  promotion?: boolean;
};
