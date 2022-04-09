import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('departments')
@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  // @ApiProperty()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getOneById(@Param('id') id: number) {
    return this.departmentService.getOneDepartmentById(id)
  }

}
