import {Entity, model, property} from '@loopback/repository';

@model()
export class Crud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: 'true',
    postgresql: {
      columnName: 'name',
      dataType: 'varchar',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  name?: string;

  @property({
    type: 'boolean',
    required: 'true',
    postgresql: {
      columnName: 'hasAccount',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  hasAccount?: boolean;

  constructor(data?: Partial<Crud>) {
    super(data);
  }
}

export interface CrudRelations {

}


