import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Dbdatasource} from '../datasources/db.datasource';
import {Crud, CrudRelations} from '../models/crud.model';

export class CrudRepository extends DefaultCrudRepository<
  Crud,
  typeof Crud.prototype.id,
  CrudRelations
>{
  constructor(@inject('datasources.db') datasource: Dbdatasource) {
    super(Crud, datasource);
  }
}
