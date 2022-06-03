export class ArgumentNullError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArgumentNullError';
  }
}
