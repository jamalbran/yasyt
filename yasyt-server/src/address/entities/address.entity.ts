import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  street: string;

  @Column()
  zipCode: number;
}
