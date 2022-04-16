import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu_item.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    private readonly userService: UserService
  ) {}

  async getMenusByIds(ids: number[]) {
    try {
      return await this.menuRepository.findByIds([...ids])
    } catch (e) {
      return new HttpException('can`t get data from db', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getMenuItemsByIds(ids: number[]) {
    try {
      return await this.menuItemRepository.findByIds([...ids])
    } catch (e) {
      return new HttpException('can`t get data from db', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createMenu(newMenuData) {
    try {
      const newMenu = this.menuRepository.create({
        title: newMenuData.title,
        date_of_edit: newMenuData.date_of_edit
      })

      newMenu.author = await this.userService.getOneUserById(newMenuData.author)
      // @ts-ignore
      newMenu.menu_items = await this.getMenuItemsByIds(newMenuData.menu_items)
    } catch (e) {
      return new HttpException('can`t create data', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  async createMenuItem(newMenuItemData) {
    try {
      const newMenuItem = this.menuItemRepository.create({
        title: newMenuItemData.title,
        description: newMenuItemData.description,
        preview: newMenuItemData.preview,
        menu_item_type: newMenuItemData.menu_item_type
      })

      // newMenuItem.entry = await

    } catch (e) {
      
    }
  }
}
