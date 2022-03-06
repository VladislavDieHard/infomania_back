import { Controller, Get, Post } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('exhibition')
export class ExhibitionController {
  client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'exhibitions_queue',
        noAck: false,
        queueOptions: {
          durable: false,
        }
      },
    });
  }

  @Get()
  getExhibitions() {
    return this.client.send('getExhibitions', {message: 'data was delivered into microservice'});
  }

  @Post()
  createExhibition() {

  }

}
