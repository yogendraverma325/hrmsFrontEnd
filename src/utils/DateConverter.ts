import moment from 'moment';

export const convertTimeStampToDate = (timestamp: string): string => {
  return moment(timestamp).format('MMMM DD YYYY, HH:mm:ss');
};
