export interface UpdateProductCommand {
  readonly id: string;
  readonly userId: string;
  readonly label: string;
  readonly code: string;
}
