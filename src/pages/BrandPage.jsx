import styled from "styled-components";
import { mobile } from "../Responsive";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { publicRequest } from "../requestAxios";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 80vw;
  height: 72vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftBox = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  margin-right: 150px;
  ${mobile({ width: "75%" })}
`;

const RightBox = styled.img`
  width: 400px;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 300;
  margin-bottom: 60px;
  text-decoration: 3px underline #12996d;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
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

const BrandPage = () => {

    const { slug } = useParams();
    const [brand, setBrand] = useState({});

    useEffect(() => {
      const getBrand = async () => {
        try {
          const res = await publicRequest.get('/brand/' + slug);
          setBrand(res.data);
          console.log(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      getBrand();
    }, [slug]);
  
  return (
    <div>
      <Navbar />
      <Container>
        <LeftBox>
          <Title>{brand?.name}</Title>
          <Description>
            <Info>
              Year of Foundation:
              <InfoResult>{brand?.foundationYear}</InfoResult>
            </Info>
            <Info>
              Head Quarter:
              <InfoResult>{brand?.headquarters}</InfoResult>
            </Info>
            <Info>
              Factory Location:
              <InfoResult>{brand?.madeIn}</InfoResult>
            </Info>
          </Description>
        </LeftBox>
        <RightBox src={brand?.brandLogo}/>
      </Container>
      <Footer/>
    </div>
  );
};

export default BrandPage;
