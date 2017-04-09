import { Pipe, PipeTransform } from "@angular/core";

import * as _ from 'lodash';

@Pipe({
  name: 'orderBy' 
})
export class OrderByPipe implements PipeTransform {
  transform(array: Array<any>, orderField: string, order: string): Array<any> {
    if (!_.isArray(array)) { return []; }
    
    return _.orderBy(array, [orderField], [order]);
  }
}