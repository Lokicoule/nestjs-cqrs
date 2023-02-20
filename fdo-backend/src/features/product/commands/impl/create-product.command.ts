export class CreateProductCommand {
  constructor(
    public readonly code: string,
    public readonly label: string,
    public readonly userId: string,
  ) {}
}
