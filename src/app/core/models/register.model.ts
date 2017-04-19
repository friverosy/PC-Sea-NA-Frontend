import { Serializable } from '@core/utils/serializable';

export class Register extends Serializable {
  static readonly STATE_CHECKIN  = 0;
  static readonly STATE_CHECKOUT = 1;
  static readonly STATE_PENDING  = 2;  
  
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