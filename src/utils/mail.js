import * as emailjs from 'emailjs-com';

const SERVICEID = 'mailgun';
const USERID = 'user_TGrQiTHjUvOZMUSWremeg';
const TEMPLATEID1 = 'zin-travel-hotel-request';
const TEMPLATEID2 = 'zin-travel-golf-request';

export const newHotelRequest = (data) => emailjs.send(SERVICEID, TEMPLATEID1, data, USERID);
export const newGolfRequest = (data) => emailjs.send(SERVICEID, TEMPLATEID2, data, USERID);
