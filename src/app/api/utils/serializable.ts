export class Serializable {    
    clone(obj) {
      for (var propName in obj)
        this[propName] = obj[propName];
      return this;
    }
    
    fromJSON(json) {
      return this.clone(json);
    }
}