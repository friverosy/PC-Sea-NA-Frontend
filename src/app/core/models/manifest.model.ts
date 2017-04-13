import { Serializable } from '@core/utils/serializable';

export class Manifest extends Serializable {
  _id: string;
  reservationId: number;
  reservationStatus: number;
  ticketId: string; 
  origin: any;
  destination: any;
  itinerary: any;
  register: any;

  constructor() {
    super();  
  }
};