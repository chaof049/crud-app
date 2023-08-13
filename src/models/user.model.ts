import {UserCredentials} from '@loopback/authentication-jwt';
import {Entity, hasOne, model, property} from '@loopback/repository';
@model()
export class NewUserRequest extends Entity {

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'password',
      dataType: 'varchar',
    },
  })
  password: string;

  @property({
    type: 'number',
    required: true,
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'realm',
      dataType: 'varchar',
    },
  })
  realm?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'username',
      dataType: 'varchar',
    },
  })
  username?: string;

  @property({
    type: 'string',
    required: false,
    postgresql: {
      columnName: 'email',
      dataType: 'varchar',
    },
  })
  email: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {
      columnName: 'emailVerified',
      dataType: 'boolean',
    },
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'verificationToken',
      dataType: 'varchar',
    },
  })
  verificationToken?: string;

  @hasOne(() => UserCredentials, {keyTo: 'userId'})
  credentials?: UserCredentials;

  constructor(data?: Partial<NewUserRequest>) {
    super(data);
  }
}

export interface NewUserRequestRelations {

}
