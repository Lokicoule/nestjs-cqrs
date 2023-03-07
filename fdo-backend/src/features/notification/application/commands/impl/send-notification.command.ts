export class SendNotificationCommand {
  constructor(
    public readonly domain: string,
    public readonly topic: string,
    public readonly message: string,
    public readonly userId: string,
  ) {}
}
