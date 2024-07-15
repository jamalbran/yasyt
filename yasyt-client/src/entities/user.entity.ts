import { Address } from "./address.entity";

export type User = {
  id: number;

  name: string;

  lastname: string;

  email: string;

  phoneNumber: number;

  address: Address;

  // @Column()
  // birthdate: Date;

  gender: string;

  profileImage: string;

  registerDate: Date;

  role: string;

  activeUser: string;
};
