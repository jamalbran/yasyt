import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: number;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  // @Column()
  // birthdate: Date;

  @Column({
    type: 'enum',
    enum: ['Prefer not to say', 'Female', 'Male', 'Non-binary'],
    default: 'Prefer not to say',
  })
  gender: string;

  @Column()
  profileImage: string;

  @CreateDateColumn()
  registerDate: Date;

  @Column({
    type: 'enum',
    enum: ['Admin', 'User'],
    default: 'User',
  })
  role: string;

  @Column({
    type: 'enum',
    enum: ['Active', 'Inactive'],
    default: 'Active',
  })
  activeUser: string;
}
