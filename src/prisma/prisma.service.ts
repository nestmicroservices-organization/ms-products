import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { envs } from 'src/config';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor() {
        const adapter = new PrismaBetterSqlite3({ url: envs.databaseUrl });
        super({ adapter });
      }
    
      private readonly logger = new Logger('PrismaServiceDB')
    
      async onModuleInit() {
          try {
              await this.$connect();
              this.logger.log('Database connected')
          } catch (error) {
              this.logger.error('Failed to connect to database', error);
              throw Error
          }
      }
    
      async onModuleDestroy() {
          await this.$disconnect();
          this.logger.log('Database diconnected')
      }

}
