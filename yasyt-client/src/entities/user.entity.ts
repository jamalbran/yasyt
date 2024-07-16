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

  gender: Gender;

  profileImage: string;

  registerDate: Date;

  role: Role;

  activeUser: ActiveStatus;
};

export enum Gender {
  PreferNotToSay = "Prefer not to say",
  Female = "Female",
  Male = "Male",
  NonBinary = "Non-binary",
}

export enum Role {
  Admin = "Admin",
  User = "User",
}

export enum ActiveStatus {
  Active = "Active",
  Inactive = "Inactive",
}
