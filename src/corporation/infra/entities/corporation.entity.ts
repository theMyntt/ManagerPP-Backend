import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'corporation' })
export class CorporationEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column({ nullable: true })
  phone: string
}
