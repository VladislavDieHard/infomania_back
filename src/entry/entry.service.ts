import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>
  ) {}

  getEntryById(ids: number[]) {
    return this.entryRepository.findByIds(ids, {
    });
  }

  getEntryBySlug(slug: string) {
    return this.entryRepository.findOne({slug: slug}, {
      relations: ['entries', 'menu_item']
    });
  }

  getEntries() {
    return this.entryRepository.findAndCount({
      relations: ['entries', 'menu_item']
    })
  }
}
