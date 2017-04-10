import { Serializable } from '@core/utils/serializable';

export class User extends Serializable {
  _id:  string;
  username:  string;
  name: string;
  role: string;
      
  constructor() {
    super();  
  }
};