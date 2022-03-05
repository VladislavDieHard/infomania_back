import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.departmentService.getOneDepartmentById(id)
  }

}
