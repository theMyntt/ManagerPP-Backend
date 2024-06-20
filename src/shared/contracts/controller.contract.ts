export interface IControllerContract<I, O> {
  perform(dto: I): Promise<O>
}
