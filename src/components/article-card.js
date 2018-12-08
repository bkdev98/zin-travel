/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.div`
  a {
    color: #4A4A4A;
    text-decoration: none;
  }
  margin-bottom: 15px;
  color: #4A4A4A;
`;

const FeaturedImage = styled.img`
  background-color: #D4AF65;
  border-radius: 6px;
  height: ${props => (props.large ? '400px' : props.small ? '200px' : '300px')};
  width: 100%;
  object-fit: cover;
  filter: brightness(85%);
  transition: all 0.4s ease;
  ${Wrapper}:hover & {
    filter: brightness(120%);
  }
`;

const Category = styled.h5`
  color: #D4AF65;
  text-transform: uppercase;
  font-size: 14px;
  margin: 8px 0px;
  letter-spacing: 0.5px;
  font-weight: 400;
  display: inline-block;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
  line-height: 22px;
`;

const Excerpt = styled.p`
  color: #4A4A4A;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Date = styled(Category)`
  color: #4A4A4A;
  font-weight: 600;
  margin-right: 10px;
`;

const ArticleCard = ({ data, slug, excerpt, large, small, locale }) => (
  <Wrapper>
    <Link to={`tin-tuc${slug}`}>
      <FeaturedImage src={data.thumbnail} alt={(locale === 'en' && data.titleEng) ? data.titleEng : data.title} large={large} small={small} />
      <Meta>
        <Date>{data.createdAt}</Date>
        <Category>
          <span>{(locale === 'en' && data.tagsEng) ? data.tagsEng.join(', ') : data.tags.join(', ')}</span>
        </Category>
      </Meta>
      <Title>{(locale === 'en' && data.titleEng) ? data.titleEng : data.title}</Title>
      <Excerpt>{excerpt}</Excerpt>
    </Link>
  </Wrapper>
);

export default ArticleCard;
