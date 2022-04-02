import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubric } from './rubric.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RubricService {
  constructor(
    @InjectRepository(Rubric)
    private rubricRepository: Repository<Rubric>
  ) {}

  getRubricById(id: number) {
    return this.rubricRepository.findByIds([id], {
      relations: ['entries', 'menu_item']
    });
  }

  getRubricBySlug(slug: string) {
    return this.rubricRepository.findOne({slug: slug}, {
      relations: ['entries', 'menu_item']
    });
  }

  getRubrics() {
    return this.rubricRepository.findAndCount()
  }

  getRubricMetaData() {

  }

  createRubric(newRubricData) {

  }
}
