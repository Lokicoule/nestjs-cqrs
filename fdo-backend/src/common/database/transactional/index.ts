import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Connection, startSession } from 'mongoose';
import { Observable } from 'rxjs';

/* @Injectable()
export class Transactional implements NestInterceptor {
  constructor(private readonly connection: Connection) {}

  async intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const result = await next.handle();
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
 */
@Injectable()
export class Transactional implements NestInterceptor {
  async intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const session = await startSession();
    session.startTransaction();
    try {
      const result = await next.handle().toPromise();
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
