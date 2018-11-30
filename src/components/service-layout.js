import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { IoIosBookmark, IoMdShare } from 'react-icons/io';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ShowMore from 'react-show-more';

import Navbar from './navbar';
import Footer from './footer';
import TruncateButton from './truncate-button';
import './layout.css';
import { typeToText } from '../utils/string';

const Wrapper = styled.div`
  margin-top: 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0px auto;
`;

const Left = styled.div`
  margin-top: 30px;
  a {
    text-decoration: none;
  }
`;

const Content = styled.div`
  font-size: 16px;
  p {
    margin-bottom: 10px;
  }
`;

const Right = styled.div`
  margin-top: 30px;
  min-height: 200px;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  width: 100%;
`;

const ImageWrapper = styled.div`
  font-size: 0;
  white-space: nowrap;
  width: 100%;
  position: relative;
  height: 55vh;
`;

const Featured = styled.div`
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 55vh;
  width: 100%;
  position: absolute;
`;

const ActionButtonWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  height: 55vh;
`;

const BottomActions = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  left: 0;
`;

const TopActions = styled.div`
  position: absolute;
  top: 20px;
  display: flex;
  right: 0;
`;

const ActionButton = styled.button`
  color: #4A4A4A;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 6px rgba(60, 60, 62, 0.2);
  transition: all 0.3s;
  :hover {
    box-shadow: 0 1px 2px rgba(60, 60, 62, 0.2);
  }
  svg {
    margin-right: 5px;
  }
`;

const Meta = styled.h5`
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #4A4A4A;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 15px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
  margin: 20px 0px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #4A4A4A;
`;

class Layout extends Component {
  state = { showGallery: false }

  handleShowGallery = () => {
    this.imageGallery.fullScreen();
    this.setState({ showGallery: true });
  }

  handleHideGallery = dom => {
    if (!dom) {
      this.setState({ showGallery: false });
    }
  }

  render() {
    const { data: { service } } = this.props;
    const { showGallery } = this.state;
    const imageData = service.frontmatter.images.map(image => ({ original: image, thumbnail: image, originalClass: 'gallery-img' }));

    return (
      <>
        <Helmet
          title={service.frontmatter.title}
          meta={[
            { name: 'description', content: 'Zin Travel' },
            { name: 'keywords', content: 'du lịch, zin travel' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Navbar />
        <Wrapper>
          <ImageWrapper>
            <Featured image={service.frontmatter.images[0]} />
            <ImageGallery
              items={imageData}
                ref={i => this.imageGallery = i} // eslint-disable-line
              onScreenChange={this.handleHideGallery}
              useBrowserFullscreen={false}
              additionalClass={showGallery ? null : 'no-display'}
            />
            <ActionButtonWrapper>
              <TopActions>
                <ActionButton style={{ marginRight: 10 }}>
                  <IoMdShare />
                  Chia sẻ
                </ActionButton>
                <ActionButton>
                  <IoIosBookmark />
                  Lưu lại
                </ActionButton>
              </TopActions>
              <BottomActions>
                <ActionButton onClick={this.handleShowGallery}>Xem ảnh</ActionButton>
              </BottomActions>
            </ActionButtonWrapper>
          </ImageWrapper>
          <Container>
            <Grid fluid style={{ padding: 0 }}>
              <Row>
                <Col md={12} lg={8}>
                  <Left>
                    <Meta>{typeToText(service.frontmatter.type)} • Hồ Chí Minh</Meta>
                    <Title>{service.frontmatter.title}</Title>
                    <Content>
                      <ShowMore lines={4} more={<TruncateButton isMore />} less={<TruncateButton />}>
                        <div dangerouslySetInnerHTML={{ __html: service.html }} />
                      </ShowMore>
                    </Content>
                    <Divider />
                    <SectionTitle>Tiện nghi</SectionTitle>
                    <Divider />
                    <SectionTitle>Hình ảnh phòng</SectionTitle>
                    <Divider />
                    <SectionTitle>Bản đồ</SectionTitle>
                  </Left>
                </Col>
                <Col sm={0} md={12} lg={4}>
                  <Right />
                </Col>
              </Row>
            </Grid>
          </Container>
        </Wrapper>
        <Footer />
      </>
    );
  }
}

export default Layout;
export const query = graphql`
  query ($slug: String!) {
    service: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        type
        images
        createdAt
      }
    }
  }
`;
