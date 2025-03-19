import { BasicEntity } from '../interface';
import { Service } from '../service';

export abstract class Controller<T extends BasicEntity> {
  protected constructor(protected readonly service: Service<T>) {}
}