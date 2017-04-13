import { Serializable } from '@core/utils/serializable';

export class Itinerary extends Serializable {
  _id: string;
  refId: number;
  name: string;
  depart: number;
  arrival: number;
      
  constructor() {
    super();  
  }
};