export interface CreateProductCommand {
  readonly userId: string;
  readonly label: string;
  readonly code?: string;
}
