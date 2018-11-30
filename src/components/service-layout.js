import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { IoIosBookmark, IoMdShare } from 'react-icons/io';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ShowMore from 'react-show-more';
import { MdPeople, MdHotel, MdHotTub } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Sticky from 'react-sticky-el';
import axios from 'axios';
import ReactStars from 'react-stars';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Navbar from './navbar';
import Footer from './footer';
import TruncateButton from './truncate-button';
import './layout.css';
import { typeToText } from '../utils/string';
import { getUtilityIcon } from '../utils/icon';
import SlideArrow from './slide-arrow';
import Map from './map';

const styles = () => ({
  outline: {
    padding: '14px 10px !important',
  },
  input: {
    fontSize: '16px !important',
  },
  button: {
    marginTop: 10,
    color: 'white',
    textTransform: 'none',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D4AF65',
    },
  },
});

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
  border-radius: 6px;
  border: 1px solid #d8d8d8;
  width: 100%;
  margin-left: 15px;
  background: white;
  padding: 20px;
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

const Information = styled.h5`
  font-weight: 400;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #4A4A4A;
`;

const Meta = styled.div`
  font-size: 15px;
  color: #4A4A4A;
  font-weight: 600;
  margin-bottom: 15px;
  div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    svg {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #d8d8d8;
  margin: 20px 0px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 15px;
  color: #4A4A4A;
`;

const Utilities = styled.div`
  span {
    color: #4A4A4A;
    font-size: 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    svg {
      margin-right: 10px;
      font-size: 22px;
    }
  }
`;

const Image = styled.div`
  height: 170px;
  width: 100%;
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;

const RelatedTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 20px;
`;

const Price = styled.h4`
  font-size: 20px;
  margin-bottom: 5px;
`;

class Layout extends Component {
  state = { showGallery: false, location: null }

  componentDidMount = async () => {
    const encodedAddress = encodeURI(this.props.data.service.frontmatter.address);
    const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAGjf9PEag69kVcGkWpDzGo0kUQgM4aiAE`);
    if (result && result.results) {
      this.setState({
        location: {
          lat: result.results[0].geometry.location.lat,
          lng: result.results[0].geometry.location.lng,
        },
      });
    }
  }

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
    const { data: { service }, classes } = this.props;
    const { showGallery, location } = this.state;
    const imageData = service.frontmatter.images.map(image => ({ original: image, thumbnail: image, originalClass: 'gallery-img' }));

    return (
      <MuiThemeProvider theme={theme}>
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
                    <Information>{typeToText(service.frontmatter.type)} • Hồ Chí Minh</Information>
                    <Title>{service.frontmatter.title}</Title>
                    <Meta>
                      {service.frontmatter.sokhach && (
                        <div><MdPeople />{service.frontmatter.sokhach} khách</div>
                      )}
                      {service.frontmatter.sogiuong && (
                        <div><MdHotel />{service.frontmatter.sogiuong} giường</div>
                      )}
                      {service.frontmatter.sophongtam && (
                        <div><MdHotTub />{service.frontmatter.sophongtam} phòng tắm</div>
                      )}
                    </Meta>
                    <Content>
                      <ShowMore lines={4} more={<TruncateButton isMore />} less={<TruncateButton />}>
                        <div dangerouslySetInnerHTML={{ __html: service.html }} />
                      </ShowMore>
                    </Content>
                    <Divider />
                    <SectionTitle>Tiện nghi</SectionTitle>
                    <Utilities>
                      <Row>
                        {service.frontmatter.utilities.map(utility => (
                          <Col key={utility.title} xs={12} sm={6}>
                            <span>{getUtilityIcon(utility.icon)} {utility.title}</span>
                          </Col>
                        ))}
                      </Row>
                    </Utilities>
                    <Divider />
                    <SectionTitle>Hình ảnh phòng</SectionTitle>
                    <Slider
                      slidesToShow={3}
                      infinite
                      autoplay
                      dots={false}
                      nextArrow={<SlideArrow type='next' />}
                      prevArrow={<SlideArrow type='prev' />}
                      responsive={[
                        {
                          breakpoint: 1024,
                          settings: {
                            slidesToShow: 3,
                          },
                        },
                        {
                          breakpoint: 600,
                          settings: {
                            slidesToShow: 2,
                          },
                        },
                      ]}
                    >
                      {service.frontmatter.images.map(image => (
                        <Image onClick={this.handleShowGallery} key={image} image={image} />
                      ))}
                    </Slider>
                    <Divider />
                    <SectionTitle location={location}>Bản đồ</SectionTitle>
                    <Map />
                    <Divider />
                  </Left>
                </Col>
                <Col sm={0} md={12} lg={4}>
                  <Sticky topOffset={-110} stickyStyle={{ marginTop: 60 }}>
                    <Right>
                      <Price>{service.frontmatter.price}</Price>
                      <ReactStars
                        value={5}
                        size={14}
                        color2='#D4AF65'
                        edit={false}
                      />
                      <Divider />
                      <form>
                        <Row>
                          <Col sm={12} md={6}>
                            <TextField
                              label="Ngày đến"
                              fullWidth
                              type='date'
                              margin="normal"
                              variant="outlined"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                classes: {
                                  root: classes.input,
                                  input: classes.outline,
                                },
                              }}
                            />
                          </Col>
                          <Col sm={12} md={6}>
                            <TextField
                              label="Ngày đi"
                              fullWidth
                              type='date'
                              margin="normal"
                              variant="outlined"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              InputProps={{
                                classes: {
                                  root: classes.input,
                                  input: classes.outline,
                                },
                              }}
                            />
                          </Col>
                        </Row>
                        <TextField
                          label="Số khách"
                          fullWidth
                          select
                          margin="normal"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            classes: {
                              root: classes.input,
                              input: classes.outline,
                            },
                          }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </TextField>
                        <TextField
                          label="Tên của bạn"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            classes: {
                              root: classes.input,
                              input: classes.outline,
                            },
                          }}
                        />
                        <TextField
                          label="Số điện thoại"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            classes: {
                              root: classes.input,
                              input: classes.outline,
                            },
                          }}
                        />
                        <Button
                          size='large'
                          fullWidth
                          color='primary'
                          variant='contained'
                          classes={{
                            root: classes.button,
                          }}
                        >
                          Đặt Phòng Ngay
                        </Button>
                      </form>
                    </Right>
                  </Sticky>
                </Col>
              </Row>
            </Grid>
            <RelatedTitle>Dịch vụ tương tự</RelatedTitle>
          </Container>
        </Wrapper>
        <Footer />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Layout);

export const query = graphql`
  query ($slug: String!) {
    service: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        type
        images
        createdAt
        sokhach
        sogiuong
        sophongtam
        price
        utilities {
          icon
          title
        }
      }
    }
  }
`;
