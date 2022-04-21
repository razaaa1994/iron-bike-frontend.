import styled from "styled-components";
import Advertisement from "../components/Advertisement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, Navigate } from "react-router-dom";
import { mobile } from "../Responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestAxios";
import { useContext } from "react";
import { CartContext } from "../context/cart.context";

const Container = styled.div``;

const ProductContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  margin-right: 50px;
  border: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: contain;
  border: none;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 60px;
  text-decoration: 3px underline #12996d;
`;

const Description = styled.div`
  display: flex;
  border-top: 3px solid black;
  flex-direction: column;
  margin-bottom: 25px;
  margin-top: 25px;
  padding-top: 25px;
`;

const AddToCartContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  padding: 13px;
  margin: 9px 30px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 183;
  font-size: small;
  width: max-content;
`;
const Info = styled.p`
  flex: 1;
  font-size: 30px;
  margin: 10px;
  color: black;
`;
const InfoResult = styled.span`
  font-size: 25px;
  margin: 10px;
  color: #12996d;
`;
const LogoBrand = styled.img`
  object-fit: contain;
  display: block;
  max-width: 100%;
  padding: 20px;
  height: 80%;
  background-color: transparent;
  margin: 10px;
  transition: all 1.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Product = () => {
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const { addOneToCart} = useContext(CartContext);
  const [productQty, setProductQty] = useState(0);

  const checkQuantity = () => {
    setProductQty(productQty <= 1 ? 1 : productQty - 1);
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + slug);
        setProduct(res.data);
        setLoading(true);
        // console.log(res.data);
      } catch (e) {
        // console.log(e);
        Navigate('/products')
        //redirect or call component errorPage
      }
    };
    getProduct();
  }, [slug]);
  // console.log({ product });

  return (
    <Container>
      <Navbar />
      <Advertisement />
      <ProductContainer>
        <ImgContainer>
          {loading && (
            <>
              <Image src={product?.image} />
            </>
          )}
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.productName}</Title>
          <Link to={`/brand/${product?.brand?.slug}`}>
            <LogoBrand src={product?.brand?.brandLogo} />
          </Link>
          <Description>
            {product?.color && (
              <Info>
                Color: <InfoResult>{product?.color}</InfoResult>
              </Info>
            )}
            {product?.categoryBike && (
              <Info>
                Category: <InfoResult>{product?.categoryBike}</InfoResult>
              </Info>
            )}
            {product?.frameMaterials && (
              <Info>
                Frame material:{" "}
                <InfoResult>{product?.frameMaterials}</InfoResult>
              </Info>
            )}
            {product?.equipment && (
              <Info>
                Equipment: <InfoResult>{product?.equipment}</InfoResult>
              </Info>
            )}
            {product?.size && (
              <Info>
                Size: <InfoResult>{product?.size}</InfoResult>
              </Info>
            )}
            {product?.weight && (
              <Info>
                Weight: <InfoResult>{product?.weight} Kg</InfoResult>
              </Info>
            )}
            {product?.features && (
              <Info>
                Features: <InfoResult>{product?.features}</InfoResult>
              </Info>
            )}
            {product?.sexCategory && (
              <Info>
                Type: <InfoResult>{product?.sexCategory}</InfoResult>
              </Info>
            )}
            {product?.ReflectiveEquipment && (
              <Info>
                Reflective Equipment:{" "}
                <InfoResult>{product?.ReflectiveEquipment}</InfoResult>
              </Info>
            )}
            {product?.rainProtection && (
              <Info>
                Rain Protection:{" "}
                <InfoResult>{product?.rainProtection}</InfoResult>
              </Info>
            )}
            {product?.flavor && (
              <Info>
                Flavor: <InfoResult>{product?.flavor}</InfoResult>
              </Info>
            )}
            {product?.toTake && (
              <Info>
                To Take: <InfoResult>{product?.toTake}</InfoResult>
              </Info>
            )}
            {product?.vegan && (
              <Info>
                Vegan: <InfoResult>{product?.vegan}</InfoResult>
              </Info>
            )}
            {product?.modelYears && (
              <Info>
                Model Years: <InfoResult>{product?.modelYears}</InfoResult>
              </Info>
            )}
            <Info>
              Price: <InfoResult>{product?.price} €</InfoResult>
            </Info>
          </Description>
          <AddToCartContainer>
            <Link to="/shoppingcart" className="Link cart-icon">
              <Button
                className="btn"
                onClick={(e) => {
                  addOneToCart(e, product);
                  setProductQty(productQty + 1);
                }}
              >
                ADD TO CART
              </Button>
            </Link>
          </AddToCartContainer>
        </InfoContainer>
      </ProductContainer>
      <Footer />
    </Container>
  );
};

export default Product;
