import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  id: string

  @Column({ unique: true })
  access_code: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
