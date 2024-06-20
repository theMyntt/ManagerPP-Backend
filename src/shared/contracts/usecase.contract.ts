export interface IUseCaseContract<I, O> {
  run(dto: I): Promise<O>
}
