import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import moment from 'moment';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData, injectIntl, FormattedMessage } from 'react-intl';
import enData from 'react-intl/locale-data/en';
import viData from 'react-intl/locale-data/vi';
import { compose } from 'recompose';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-responsive-modal';

import Navbar from './navbar';
import Footer from './footer';
import TruncateButton from './truncate-button';
import Snackbar from './snackbar';
import './layout.css';
import { typeToText, typeToUrl, typeToButtonText } from '../utils/string';
import { getUtilityIcon } from '../utils/icon';
// import { newHotelRequest, newGolfRequest } from '../utils/mail';
import SlideArrow from './slide-arrow';
import Map from './map';
import ServiceCard from './service-card';
import { saveService, unsaveService, createRequest } from '../actions';
import { media } from '../utils/media';
import MobileMenu from './mobile-menu';

import en from '../locale/en.json';
import vi from '../locale/vi.json';

const messages = { en, vi };

addLocaleData([...enData, ...viData]);

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
  bottomButton: {
    margin: '10px 0',
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
  ${media.desktop`
    padding: 0px 20px;
  `};
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
  ${media.tablet`
    display: none;
  `};
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
  left: 20px;
`;

const TopActions = styled.div`
  position: absolute;
  top: 20px;
  display: flex;
  right: 20px;
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
  a {
    color: #4A4A4A;
    text-decoration: none;
    :hover {
      color: #D4AF65;
    }
    transition: all 0.3s;
  }
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

const ShowAll = styled(Link)`
  color: #D4AF65;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0px;
  text-decoration: none;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #D4AF65;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease-in-out;
    transition-delay: 0.1s;
  }
  :hover::after {
    transform: scaleX(1);
    transition-delay: 0s;
  }
`;

const BottomWrapper = styled.div`
  width: 100%;
  height: 65px;
  background-color: white;
  border-top: 1px solid #ccc;
  justify-content: space-between;
  padding: 0 20px;
  display: none;
  position: fixed;
  bottom: 0;
  z-index: 999;
  ${media.tablet`
    display: flex;
  `};
`;

const MyHelmet = ({ intl, locale }) => (
  <Helmet
    title={intl.formatMessage({ id: 'site.title' })}
    meta={[
      { name: 'description', content: intl.formatMessage({ id: 'site.description' }) },
      { name: 'keywords', content: 'du lịch, zin travel, traveling, hotel, restaurant' },
    ]}
  >
    <html lang={locale} />
  </Helmet>
);

const InjectedHelmet = compose(injectIntl)(MyHelmet);

class Layout extends Component {
  state = {
    showGallery: false,
    location: null,
    fields: {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().add(3, 'days').format('YYYY-MM-DD'),
      useDate: moment().add(1, 'days').format('YYYY-MM-DD'),
      time: moment().format('HH:mm'),
      customerCount: 2,
      customerName: '',
      customerPhone: '',
    },
    showSnackbar: false,
    snackbarMessage: '',
    isError: false,
    menuOpen: false,
    modalOpen: false,
  }

  componentDidMount = async () => {
    const encodedAddress = encodeURI(this.props.data.service.frontmatter.address);
    const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAGjf9PEag69kVcGkWpDzGo0kUQgM4aiAE`);
    if (result && result.results) {
      // console.log(result.results[0]);
      this.setState({
        location: {
          lat: result.results[0].geometry.location.lat,
          lng: result.results[0].geometry.location.lng,
        },
      });
    }
  }

  handleChange = (value, field) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [field]: value,
      },
    });
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

  handleSubmit = async e => {
    e.preventDefault();
    const { fields } = this.state;
    const { data: { service, contact }, createRequest } = this.props;
    if (!fields.useDate || !fields.time || !fields.customerCount || !fields.customerName || !fields.customerPhone ||
      !fields.customerName.length || !fields.customerPhone.length) {
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Cần điền đầy đủ thông tin',
        isError: true,
      });
    } else {
      createRequest({
        type: service.frontmatter.type,
        title: `Yêu cầu đặt ${service.frontmatter.title}.`,
        to_name: contact.edges[0].node.companyName,
        contact_email: contact.edges[0].node.managerEmail,
        ...fields,
      }, {
        success: () => this.setState({
          showSnackbar: true,
          snackbarMessage: 'Thành công, chúng tôi sẽ liên lạc qua SĐT để xác nhận',
          fields: {
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().add(3, 'days').format('YYYY-MM-DD'),
            useDate: moment().add(1, 'days').format('YYYY-MM-DD'),
            time: moment().format('HH:mm'),
            customerCount: 2,
            customerName: '',
            customerPhone: '',
          },
        }),
        failure: () => this.setState({
          showSnackbar: true,
          snackbarMessage: 'Có lỗi xảy ra khi gửi yêu cầu',
          isError: true,
        }),
      });
    }
    // if (service.frontmatter.type === 'hotel') {
    //   if (!fields.startDate || !fields.endDate || !fields.customerCount || !fields.customerName || !fields.customerPhone ||
    //     !fields.customerName.length || !fields.customerPhone.length) {
    //     this.setState({
    //       showSnackbar: true,
    //       snackbarMessage: 'Cần điền đầy đủ thông tin',
    //       isError: true,
    //     });
    //   } else {
    //     try {
    //       await newHotelRequest({
    //         title: `Yêu cầu đặt phòng ${service.frontmatter.title}.`,
    //         to_name: contact.edges[0].node.companyName,
    //         contact_email: contact.edges[0].node.managerEmail,
    //         ...fields,
    //       });
    //       this.setState({
    //         showSnackbar: true,
    //         snackbarMessage: 'Thành công, chúng tôi sẽ liên lạc qua SĐT để xác nhận',
    //       });
    //     } catch (error) {
    //       this.setState({
    //         showSnackbar: true,
    //         snackbarMessage: 'Có lỗi xảy ra khi gửi yêu cầu',
    //         isError: true,
    //       });
    //     }
    //   }
    // } else if (service.frontmatter.type === 'restaurant' || service.frontmatter.type === 'golf') {
    //   if (!fields.date || !fields.time || !fields.customerCount || !fields.customerName || !fields.customerPhone ||
    //     !fields.customerName.length || !fields.customerPhone.length) {
    //     this.setState({
    //       showSnackbar: true,
    //       snackbarMessage: 'Cần điền đầy đủ thông tin',
    //       isError: true,
    //     });
    //   } else {
    //     try {
    //       await newGolfRequest({
    //         title: `Yêu cầu đặt ${service.frontmatter.title}.`,
    //         to_name: contact.edges[0].node.companyName,
    //         contact_email: contact.edges[0].node.managerEmail,
    //         ...fields,
    //       });
    //       this.setState({
    //         showSnackbar: true,
    //         snackbarMessage: 'Thành công, chúng tôi sẽ liên lạc qua SĐT để xác nhận',
    //       });
    //     } catch (error) {
    //       this.setState({
    //         showSnackbar: true,
    //         snackbarMessage: 'Có lỗi xảy ra khi gửi yêu cầu',
    //         isError: true,
    //       });
    //     }
    //   }
    // }
  }

  handleCloseError = () => {
    this.setState({ showSnackbar: false, snackbarMessage: '', isError: false });
  }

  handleShareToFb = () => {
    const { data: { service } } = this.props;
    const title = service.frontmatter.title;
    const descr = service.excerpt;
    const image = `https://zintravel.innoteq.site${service.frontmatter.images[0]}`;
    const url = `https://zintravel.innoteq.site/dich-vu${service.fields.slug}`;
    window.open(`http://www.facebook.com/sharer.php?u=${url}&title=${title}&description=${descr}&picture=${image}`);
  }

  handleToggleSave = isSaved => {
    const { data: { service }, saveService, unsaveService } = this.props; // eslint-disable-line
    delete service.html;
    if (!isSaved) {
      saveService(service);
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Đã lưu dịch vụ này',
      });
    } else {
      unsaveService(service);
      this.setState({
        showSnackbar: true,
        snackbarMessage: 'Huỷ lưu dịch vụ thành công',
      });
    }
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { data: { service, relatedServices }, classes, savedServices, pageContext: { locale }, sendingRequest } = this.props;
    const { showGallery, location, fields, showSnackbar, snackbarMessage, isError, menuOpen, modalOpen } = this.state;
    const imageData = service.frontmatter.images.map(image => ({ original: image, thumbnail: image, originalClass: 'gallery-img' }));
    const isSaved = savedServices.findIndex(item => item.id === service.id) >= 0;

    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <MuiThemeProvider theme={theme}>
          <InjectedHelmet locale={locale} />
          <MobileMenu
            toggleMenu={this.toggleMenu}
            isOpen={menuOpen}
            pageWrapId={'page-wrap'}
            hideCloseButton
          />
          <Navbar toggleMenu={this.toggleMenu} />
          <BottomWrapper>
            <div>
              <Price style={{ fontSize: 16, marginTop: 10 }}>{service.frontmatter.price}</Price>
              <ReactStars
                value={5}
                size={12}
                color2='#D4AF65'
                edit={false}
              />
            </div>
            <Button
              color='primary'
              variant='contained'
              classes={{ root: classes.bottomButton }}
              onClick={() => this.setState({ modalOpen: true })}
            >
              {typeToButtonText(service.frontmatter.type, locale)}
            </Button>
          </BottomWrapper>
          <Modal center open={modalOpen} onClose={() => this.setState({ modalOpen: false })}>
            <Price>{service.frontmatter.price}</Price>
            <ReactStars
              value={5}
              size={14}
              color2='#D4AF65'
              edit={false}
            />
            <Divider />
            <form onSubmit={this.handleSubmit}>
              {service.frontmatter.type === 'hotel' ? (
                <Row>
                  <Col sm={12} md={6}>
                    <TextField
                      label="Ngày đến"
                      fullWidth
                      type='date'
                      value={fields.startDate}
                      onChange={e => this.handleChange(e.target.value, 'startDate')}
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
                      value={fields.endDate}
                      onChange={e => this.handleChange(e.target.value, 'endDate')}
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
              ) : (
                <Row>
                  <Col sm={12} md={6}>
                    <TextField
                      label="Ngày dùng"
                      fullWidth
                      type='date'
                      value={fields.useDate}
                      onChange={e => this.handleChange(e.target.value, 'useDate')}
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
                      label="Thời gian"
                      fullWidth
                      type='time'
                      value={fields.time}
                      onChange={e => this.handleChange(e.target.value, 'time')}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        step: 300,
                        classes: {
                          root: classes.input,
                          input: classes.outline,
                        },
                      }}
                    />
                  </Col>
                </Row>
              )}
              <TextField
                label="Số khách"
                fullWidth
                select
                value={fields.customerCount}
                onChange={e => this.handleChange(e.target.value, 'customerCount')}
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
                value={fields.customerName}
                onChange={e => this.handleChange(e.target.value, 'customerName')}
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
                value={fields.customerPhone}
                onChange={e => this.handleChange(e.target.value, 'customerPhone')}
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
                disabled={sendingRequest}
                variant='contained'
                classes={{
                  root: classes.button,
                }}
                onClick={this.handleSubmit}
              >
                {typeToButtonText(service.frontmatter.type, locale)}
              </Button>
            </form>
          </Modal>
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
                  <ActionButton style={{ marginRight: 10 }} onClick={this.handleShareToFb}>
                    <IoMdShare />
                    <FormattedMessage id='service.share' />
                  </ActionButton>
                  <ActionButton onClick={() => this.handleToggleSave(isSaved)}>
                    <IoIosBookmark />
                    {isSaved ? 'Huỷ lưu' : <FormattedMessage id='service.save' />}
                  </ActionButton>
                </TopActions>
                <BottomActions>
                  <ActionButton onClick={this.handleShowGallery}><FormattedMessage id='service.showPhoto' /></ActionButton>
                </BottomActions>
              </ActionButtonWrapper>
            </ImageWrapper>
            <Container>
              <Grid fluid style={{ padding: 0 }}>
                <Row>
                  <Col md={12} lg={8}>
                    <Left>
                      <Information>
                        <Link to={typeToUrl(service.frontmatter.type)}>
                          {typeToText(service.frontmatter.type, locale)}
                        </Link> • <AnchorLink href='#map'>
                          {(locale === 'en' && service.frontmatter.addressEng) ? service.frontmatter.addressEng : service.frontmatter.address}
                        </AnchorLink>
                      </Information>
                      <Title>{(locale === 'en' && service.frontmatter.titleEng) ? service.frontmatter.titleEng : service.frontmatter.title}</Title>
                      <Meta>
                        {service.frontmatter.sokhach && (
                          <div><MdPeople />{service.frontmatter.sokhach}&nbsp;<FormattedMessage id='service.persons' /></div>
                        )}
                        {service.frontmatter.sogiuong && (
                          <div><MdHotel />{service.frontmatter.sogiuong}&nbsp;<FormattedMessage id='service.beds' /></div>
                        )}
                        {service.frontmatter.sophongtam && (
                          <div><MdHotTub />{service.frontmatter.sophongtam}&nbsp;<FormattedMessage id='service.bedRooms' /></div>
                        )}
                      </Meta>
                      <Content>
                        <ShowMore lines={4} more={<TruncateButton isMore />} less={<TruncateButton />}>
                          {(locale === 'en' && service.frontmatter.bodyEng)
                            ? <ReactMarkdown source={service.frontmatter.bodyEng} />
                            : <div dangerouslySetInnerHTML={{ __html: service.html }} />}
                        </ShowMore>
                      </Content>
                      <Divider />
                      {service.frontmatter.utilities && (
                        <>
                          <SectionTitle><FormattedMessage id='service.utilities' /></SectionTitle>
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
                        </>
                      )}
                      <SectionTitle><FormattedMessage id='service.photo' /></SectionTitle>
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
                      <SectionTitle id='map' location={location}><FormattedMessage id='service.map' /></SectionTitle>
                      <Map address={service.frontmatter.address} />
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
                        <form onSubmit={this.handleSubmit}>
                          {service.frontmatter.type === 'hotel' ? (
                            <Row>
                              <Col sm={12} md={6}>
                                <TextField
                                  label="Ngày đến"
                                  fullWidth
                                  type='date'
                                  value={fields.startDate}
                                  onChange={e => this.handleChange(e.target.value, 'startDate')}
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
                                  value={fields.endDate}
                                  onChange={e => this.handleChange(e.target.value, 'endDate')}
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
                          ) : (
                            <Row>
                              <Col sm={12} md={6}>
                                <TextField
                                  label="Ngày dùng"
                                  fullWidth
                                  type='date'
                                  value={fields.useDate}
                                  onChange={e => this.handleChange(e.target.value, 'useDate')}
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
                                  label="Thời gian"
                                  fullWidth
                                  type='time'
                                  value={fields.time}
                                  onChange={e => this.handleChange(e.target.value, 'time')}
                                  margin="normal"
                                  variant="outlined"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  InputProps={{
                                    step: 300,
                                    classes: {
                                      root: classes.input,
                                      input: classes.outline,
                                    },
                                  }}
                                />
                              </Col>
                            </Row>
                          )}
                          <TextField
                            label="Số khách"
                            fullWidth
                            select
                            value={fields.customerCount}
                            onChange={e => this.handleChange(e.target.value, 'customerCount')}
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
                            value={fields.customerName}
                            onChange={e => this.handleChange(e.target.value, 'customerName')}
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
                            value={fields.customerPhone}
                            onChange={e => this.handleChange(e.target.value, 'customerPhone')}
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
                            disabled={sendingRequest}
                            color='primary'
                            variant='contained'
                            classes={{
                              root: classes.button,
                            }}
                            onClick={this.handleSubmit}
                          >
                            {typeToButtonText(service.frontmatter.type, locale)}
                          </Button>
                        </form>
                      </Right>
                    </Sticky>
                  </Col>
                </Row>
              </Grid>
              <RelatedTitle>Dịch vụ tương tự</RelatedTitle>
              <Grid fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row>
                  {relatedServices ? relatedServices.edges.map(({ node }) => (
                    <Col lg={3} md={6} sm={12} key={node.id}>
                      <ServiceCard data={node.frontmatter} slug={node.fields.slug} />
                    </Col>
                  )) : <span style={{ fontSize: 16 }}>Không tìm thấy dịch vụ liên quan</span>}
                </Row>
              </Grid>
              {relatedServices && <ShowAll to={typeToUrl(service.frontmatter.type)}>Xem thêm gợi ý</ShowAll>}
            </Container>
          </Wrapper>
          <Footer locale={locale} />
          <Snackbar isError={isError} open={showSnackbar} message={snackbarMessage} onClose={this.handleCloseError} />
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

export default connect(state => ({
  savedServices: state.services.saved,
  sendingRequest: state.services.sendingRequest,
}), {
  saveService,
  unsaveService,
  createRequest,
})(withStyles(styles)(Layout));

export const query = graphql`
  query GetServiceData ($slug: String!, $type: String!) {
    contact: allPagesYaml(filter: { managerEmail: { ne: null } }) {
      edges {
        node {
          managerEmail
          companyName
        }
      }
    }
    service: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        titleEng
        bodyEng
        type
        images
        createdAt
        sokhach
        address
        addressEng
        sogiuong
        sophongtam
        price
        priceEng
        utilities {
          icon
          title
        }
      }
      excerpt(pruneLength: 80)
      fields {
        slug
      }
    }
    relatedServices: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: $type } }, fields: { slug: { ne: $slug } } }
      sort: { fields: [frontmatter___createdAt], order: DESC }
      limit: 4
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            titleEng
            type
            images
            createdAt
            address
            addressEng
            price
            priceEng
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
