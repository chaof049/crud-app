import {User, UserRelations} from '@loopback/authentication-jwt';
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {NewUserRequest} from '../models';

@model()
export class UserCredentials extends Entity {

  @property({ // PK
    id: true
  })
  id: number

  @belongsTo(() => NewUserRequest, {name: 'credentials'}) // FK
  userId: number;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  user?: UserWithRelations;
}

export type UserWithRelations = User & UserRelations;
