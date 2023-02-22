export class CreateProductCommand {
  constructor(
    public readonly userId: string,
    public readonly label: string,
    public readonly code?: string,
  ) {}
}
