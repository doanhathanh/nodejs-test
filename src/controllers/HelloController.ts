import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';

@Controller('api')
export class HelloController {
  private controllerName = 'logs';

  @Get('hello')
  private async hello(req: Request, res: Response): Promise<void> {
    const act = this.controllerName + '.getListLog';

    res.status(200).json({
      act: act,
      data: 'hello'
    });
  }
}
