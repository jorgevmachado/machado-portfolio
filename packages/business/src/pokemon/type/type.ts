import { IType } from '../../api/nest/pokemon';
import { Base } from '../../shared';
import { findColor } from './config';

interface TypeConstructorParams
  extends Omit<
    IType,
    | 'id'
    | 'order'
    | 'text_color'
    | 'created_at'
    | 'deleted_at'
    | 'updated_at'
    | 'background_color'
  > {
  id?: string;
  order?: number;
  text_color?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  background_color?: string;
}

export default class Type extends Base implements IType {
  id!: IType['id'];
  url!: IType['url'];
  name!: IType['name'];
  order!: IType['order'];
  created_at!: IType['created_at'];
  updated_at!: IType['updated_at'];
  deleted_at!: IType['deleted_at'];
  text_color!: IType['text_color'];
  background_color!: IType['background_color'];

  constructor(type?: TypeConstructorParams) {
    super();
    if (type) {
      this.id = type.id ?? this.id;
      this.url = type.url ?? this.url;
      this.name = type.name ?? this.name;
      this.order = type.order ?? this.ensureOrder(this.order, type.url ?? this.url);
      this.created_at = type.created_at ?? this.created_at;
      this.updated_at = type.updated_at ?? this.updated_at;
      this.deleted_at = type.deleted_at ?? this.deleted_at;
      const { text_color, background_color } = findColor(
        type?.name,
        this.text_color,
        this.background_color,
      );
      this.text_color = text_color;
      this.background_color = background_color;
    }
  }
}