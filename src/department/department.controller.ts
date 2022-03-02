import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.departmentService.getOneDepartmentById(id)
  }

}
