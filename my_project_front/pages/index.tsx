import type { NextPage } from 'next'
import { GetStaticProps } from "next";
import { Product } from '../types/wooCommerce.types';
import { fetchWooCommerceProducts } from '../utils/api';
import styled from 'styled-components';
import CartItem from './cartItem';
import ProductCard from './productCart';

interface Props {
  products: Product[];
}

const StyledGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledBox = styled.div`
  margin: 2.5vw;
  padding: 10px;
  width: 30vw;
  border: 5px solid black;
  border-radius: 10px;
`;
const StyledBox1 = styled.div`
  margin: 2.5vw;
  padding: 10px;
  width: 60vw;
  border: 5px solid black;
  border-radius: 10px;
`;

const StyledTitle = styled.h1`
  font-family: ${(props) => props.theme.font.heading};
  text-align: center;
  font-size: 30px;
  margin: 0;
  padding: 20px;
  background-color: #6767ff;
  color: #caccfe;
  box-shadow: #caccfe 0px 0px 4px 3px;
  width: 100vw;
`;

const Home: NextPage<Props> = ({products}) => {
  console.log({products});
  
  return (
    <StyledGrid>
    <StyledTitle>Mon site de e-commerce</StyledTitle>
    <StyledBox>
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </StyledBox>
    <StyledBox1>
      ha
    </StyledBox1>
    </StyledGrid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const wooCommerceProducts = await fetchWooCommerceProducts().catch((error) =>
    console.error(error)
  );

  if (!wooCommerceProducts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: wooCommerceProducts.data,
    },
    // revalidate: 60 // regenerate page with new data fetch after 60 seconds
  };
};

export default Home
