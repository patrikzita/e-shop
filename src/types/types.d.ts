export type ProductProps = {
  id?: string;
  name: string;
  price: number;
  type: string;
  imgUrl: string;
  amount: number;
  description: string;
  discount?: number;
  promotion?: boolean;
};

export type OptionalProductsProps = {
  name: string;
  price: number;
  imgUrl: string;
  discount: number;
  type: string;
  amount: number;
  description: string;
  id: string | null;
};
