export class MissingProductCodeException extends Error {
  constructor() {
    super('Product code is missing');
    this.name = 'MissingProductCodeException';
  }
}
