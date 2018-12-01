import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { typeToText } from '../utils/string';

const Wrapper = styled.div`
  a {
    color: #000000;
    text-decoration: none;
  }
  margin-bottom: 15px;
`;

const FeaturedImage = styled.img`
  background-color: #D4AF65;
  border-radius: 6px;
  height: 200px;
  width: 100%;
  filter: brightness(85%);
  transition: all 0.4s ease;
  ${Wrapper}:hover & {
    filter: brightness(120%);
  }
`;

const Category = styled.h5`
  color: #D4AF65;
  text-transform: uppercase;
  font-size: 12px;
  margin: 8px 0px;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Price = styled.p`
  color: #4A4A4A;
  font-size: 14px;
  margin-bottom: 5px;
`;

const ServiceCard = ({ data, slug }) => (
  <Wrapper>
    <Link to={`dich-vu${slug}`}>
      <FeaturedImage src={data.images[0]} alt={data.title} />
      <Category>
        <span>{typeToText(data.type)} </span> • <span> {`${data.address.slice(0, 20)}...`}</span>
      </Category>
      <Title>{data.title}</Title>
      <Price>{data.price}</Price>
    </Link>
  </Wrapper>
);

export default ServiceCard;
