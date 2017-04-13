import { Serializable } from '@core/utils/serializable';

export class Seaport extends Serializable {
  _id:  string;
  locationId: string;
  locationName: string;
      
  constructor() {
    super();  
  }
};