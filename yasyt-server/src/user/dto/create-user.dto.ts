import { Address } from 'src/address/entities/address.entity';

export class CreateUserDto {
  name: string;

  lastname: string;

  email: string;

  phoneNumber: number;

  profileImage: string;

  address: Address;
}
