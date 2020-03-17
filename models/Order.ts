import moment from 'moment';

export default class Order {
  constructor(
    public id,
    public items,
    public totalAmount: number,
    public date: Date
  ) {}

  getReadableDate() {
    // return this.date.toLocaleDateString('en-EN', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // });
    return moment(this.date).format('MMMM Do YYYY, hh:mm')
  }
};
