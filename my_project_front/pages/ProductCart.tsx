import styled from "styled-components";
import Image from "next/image";
import { Product } from "../types/wooCommerce.types";
import { addLineItem } from "../store/slices/cartSlice";
import { useAppDispatch } from "../store/hooks";

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  const { product } = props;

  const dispatch = useAppDispatch()
  return (
    <Card>
      {
        product?.images?.length === 0 && (
          <ImageContainer>
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              layout="fill"
              objectFit="cover"
            />
          </ImageContainer>
        )
      }
      
      <Details>
        <span>{product.name}</span>
        <span>--</span>
        <span>
          <strong>£{product.regular_price}</strong>
        </span>
      </Details>
      <button onClick={() => dispatch(addLineItem({
        productId: product.id,
        quantity: 1
      }))}>Add to cart</button>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */
  padding-bottom: 100%; /* forces square aspect ratio */
`;

const Details = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 5%;
  padding-bottom: 7%;
  display: flex;
  justify-content: center;
  gap: 12px;
`;