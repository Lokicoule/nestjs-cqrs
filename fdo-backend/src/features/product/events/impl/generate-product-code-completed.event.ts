export class GenerateProductCodeCompletedEvent {
  constructor(public readonly userId: string, public readonly code: string) {}
}
