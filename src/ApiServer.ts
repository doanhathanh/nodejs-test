import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import * as http from 'http';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response, NextFunction } from 'express';

class ApiServer extends Server {
  private readonly SERVER_STARTED: string = 'Server started on port: ';
  private appserver: http.Server;

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.all('/*', this.setupCORS);
    this.setupControllers();
  }

  private setupControllers(): void {
    const ctlrInstances = [];
    for (const name in controllers) {
      if (Object.prototype.hasOwnProperty.call(controllers, name)) {
        // eslint-disable-next-line
        const controller = (controllers as any)[name];
        ctlrInstances.push(new controller());
      }
    }
    super.addControllers(ctlrInstances);
  }

  public async start(port: number): Promise<void> {
    try {
      this.appserver = this.app.listen(port, () => {
        Logger.Imp(this.SERVER_STARTED + port);
      });

      this.appserver.setTimeout(parseInt(<string>process.env.SERVER_TIMEOUT, 10));
    } catch (ex) {
      Logger.Imp('SERVER_STARTED FAILED: ' + ex.message);
    }
  }

  public stop(): void {
    this.appserver.close();
  }

  private setupCORS(req: Request, res: Response, next: NextFunction): void {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    res.header(
      'Access-Control-Allow-Headers',
      `Origin, X-Requested-With, Content-type, Accept, X-Access-Token, X-Key, Authorization`
    );

    const allowOrigins: string[] = (<string>process.env.ALLOW_ORIGIN).split(',');
    let origin = '';
    const headersOrigin = req.headers.origin ? <string>req.headers.origin : '';

    if (allowOrigins.length === 1 && allowOrigins[0] === '*') origin = '*';
    else if (allowOrigins.indexOf(headersOrigin.toLowerCase()) > -1) origin = headersOrigin;
    else origin = allowOrigins[0];

    res.header('Access-Control-Allow-Origin', origin);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }
}

export default ApiServer;
