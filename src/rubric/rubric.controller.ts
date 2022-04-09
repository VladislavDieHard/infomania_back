import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RubricService } from './rubric.service';
import { CreateRubricDto } from './dto/create-rubric.dto';

@ApiTags('rubrics')
@Controller('rubrics')
export class RubricController {
  constructor(
    private rubricService: RubricService
  ) {}

  @Get()
  getRubrics() {
    return this.rubricService.getRubrics();
  }

  @Get()
  getRubricById() {

  }

  @Get(':id')
  getRubricMetaData(@Param('id') id: number) {
    return id
  }

  @Post()
  createRubric(@Body() newRubricData: CreateRubricDto) {
    return this.rubricService.createRubric(newRubricData)
  }

  @Put()
  updateRubric() {

  }

  @Delete()
  deleteRubric() {

  }
}
