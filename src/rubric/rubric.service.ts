import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubric } from './rubric.entity';
import { Repository } from 'typeorm';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { translitRusEng } from 'translit-rus-eng';
import { EntryService } from '../entry/entry.service';

@Injectable()
export class RubricService {
  constructor(
    @InjectRepository(Rubric)
    private rubricRepository: Repository<Rubric>,
    private readonly entryService: EntryService
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
    return this.rubricRepository.findAndCount({
      relations: ['entries', 'menu_item']
    })
  }

  getRubricMetaData() {

  }

  async createRubric(newRubricData: CreateRubricDto) {
    console.log(newRubricData)
    const newRubric = await this.rubricRepository.create({
        title: newRubricData.title,
        description: newRubricData.description,
        // date_of_create: new Date(),
        // date_of_edit: new Date(),
        slug: 'sad'
        // slug: translitRusEng(newRubricData.title, { slug: true })
    })
    newRubric.entries = await this.entryService.getEntryById(newRubricData.entries)
    // @ts-ignore
    newRubric.menu_item = await this.menu

    try {
      return await this.rubricRepository.save(newRubric)
    } catch (e) {
      return new HttpException({
        message: e.message
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
