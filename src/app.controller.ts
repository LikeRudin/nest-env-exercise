import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get('/')
  showhome(@Req() req: Request, @Res() res: Response) {
    console.log(req.cookies);
    res.cookie('exampleCookie', 'cookieValue');
    res.send(`Good`);
    return '<h1>Hello</h1>';
  }
}
