import { Serializable } from '@core/utils/serializable';

export class Person extends Serializable {
  _id:  string;
  name: string;
  sex: string;
  resident: string;
  nationality: string;
  documentType: string;
  documentId: string;
  age: Date;
  birthdate: string;
      
  constructor() {
    super();  
  }
};