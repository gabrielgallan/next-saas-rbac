export class MemberIsNotPartOfOrgError extends Error
{
  constructor() {
    super('Member is not part of org')
  }
}