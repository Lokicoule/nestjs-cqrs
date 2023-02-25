export type PropertyRequiredFields = Readonly<
  Required<{
    value: string | number;
  }>
>;

export type PropertyFields = PropertyRequiredFields;

export class Property {
  public readonly value: string | number;

  constructor(fields: PropertyFields) {
    Object.assign(this, fields);
  }
}
