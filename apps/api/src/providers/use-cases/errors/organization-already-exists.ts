export class OrgazinationAlreadyExistsError extends Error
{
  constructor() {
    super('Organization already exists!')
  }
}