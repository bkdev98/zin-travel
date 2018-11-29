import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import image from '../../static/assets/jonathan-percy-501302-unsplash.jpg';

const Wrapper = styled.div`
  a {
    color: #000000;
    text-decoration: none;
  }
  margin-bottom: 15px;
`;

const FeaturedImage = styled.div`
  background-image: url(${image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #D4AF65;
  border-radius: 6px;
  height: 200px;
`;

const Category = styled.h5`
  color: #D4AF65;
  text-transform: uppercase;
  font-size: 12px;
  margin: 8px 0px;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Price = styled.p`
  color: #4A4A4A;
  font-size: 14px;
  margin-bottom: 5px;
`;

const ServiceCard = () => (
  <Wrapper>
    <Link>
      <FeaturedImage />
      <Category>
        <span>Khách sạn </span> • <span> Hồ Chí Minh</span>
      </Category>
      <Title>Phòng đôi khách sạn Quang Trung</Title>
      <Price>1.500.000đ / đêm</Price>
    </Link>
  </Wrapper>
);

export default ServiceCard;
