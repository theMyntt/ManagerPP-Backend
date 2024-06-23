export interface IRepositoryContract<I, O> {
  create(dto: I): Promise<O>
  find(dto: I): Promise<O>
  findAll(dto: I, limit): Promise<O>
  update(dto: I): Promise<O>
  delete(dto: I): Promise<O>
}
