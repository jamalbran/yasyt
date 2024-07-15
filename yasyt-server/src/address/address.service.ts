import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const address: Address = new Address();
    address.number = createAddressDto.number;
    address.street = createAddressDto.street;
    address.zipCode = createAddressDto.zipCode;
    return this.addressRepository.save(address);
  }

  findAll() {
    return `This action returns all address`;
  }

  findOneAddress(id: number) {
    // return this.addressRepository.findOneBy({ id });
    return `This action return address id ${id}`;
  }

  updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address: Address = new Address();
    address.id = id;
    address.number = updateAddressDto.number;
    address.street = updateAddressDto.street;
    address.zipCode = updateAddressDto.zipCode;
    return this.addressRepository.save(address);
  }

  removeAddress(id: number): Promise<{ affected?: number }> {
    return this.addressRepository.delete(id);
  }
}
