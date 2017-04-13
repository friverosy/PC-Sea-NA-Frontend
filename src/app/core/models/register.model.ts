import { Serializable } from '@core/utils/serializable';

export class Register extends Serializable {
  static STATE_CHECKIN  = 'checkin';
  static STATE_CHECKOUT = 'checkout';
  static STATE_PENDING  = 'pending';  
  
  _id:  string;
  state: string;
  isOnboard: boolean;
  isDenied: boolean;
  
  person: any;
  manifest: any;
  seaportCheckin: any;
  seaportCheckout: any;
  
  checkinDate: number;
  checkoutDate: number;
    
  constructor() {
    super();  
  }
};