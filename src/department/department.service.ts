import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>
  ) {}

  getOneDepartmentById(id: number): Promise<Department> {
    return this.departmentRepository.findOne(id, {relations: ['user']})
  }

  getAllRepositories(): Promise<Department[]> {
    return this.departmentRepository.find()
  }

}
