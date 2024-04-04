import moment from 'moment';

export const convertTimeStampToDate = (timestamp: string): string => {
  return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
};
