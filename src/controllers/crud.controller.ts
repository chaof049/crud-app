import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter, FilterExcludingWhere, repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef, param, patch, post, put, requestBody
} from '@loopback/rest';
import {Crud} from '../models/crud.model';
import {CrudRepository} from '../repositories/crud.repository';


@authenticate('jwt')
export class CrudController {
  constructor(
    @repository(CrudRepository)
    public crudRepository: CrudRepository,
  ) { }

  @post('/cruds', {
    responses: {
      '200': {
        description: 'crud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Crud)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crud, {
            title: 'NewCrud',
            exclude: ['id'],
          }),
        },
      },
    })
    crud: Omit<Crud, 'id'>,
  ): Promise<Crud> {
    return this.crudRepository.create(crud);
  }

  @get('/cruds/{id}', {
    responses: {
      '200': {
        description: 'crud model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Crud, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Crud, {exclude: 'where'}) filter?: FilterExcludingWhere<Crud>
  ): Promise<Crud> {
    return this.crudRepository.findById(id, filter);
  }

  @get('/cruds', {
    responses: {
      '200': {
        description: 'array of crud model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Crud, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Crud) filter?: Filter<Crud>,
  ): Promise<Crud[]> {
    return this.crudRepository.find(filter);
  }

  @put('/cruds/{id}', {
    responses: {
      '204': {
        description: 'crud put success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() crud: Crud,
  ): Promise<void> {
    await this.crudRepository.replaceById(id, crud);
  }

  @patch('/cruds/{id}', {
    responses: {
      '204': {
        description: 'crud patch success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crud, {partial: true}),
        },
      },
    })
    crud: Crud,
  ): Promise<void> {
    await this.crudRepository.updateById(id, crud);
  }

  @del('/cruds/{id}', {
    responses: {
      '204': {
        description: 'crud delete success',
      },
    },
  })
  async deleteBYId(@param.path.number('id') id: number): Promise<void> {
    await this.crudRepository.deleteById(id);
  }

  @get('/cruds/count', {
    responses: {
      '200': {
        description: 'crud model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Crud) where?: Where<Crud>,
  ): Promise<Count> {
    return this.crudRepository.count(where);
  }

  @patch('/cruds', {
    responses: {
      '200': {
        description: 'crud patch success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crud, {partial: true}),
        },
      },
    })
    crud: Crud,
    @param.where(Crud) where?: Where<Crud>,
  ): Promise<Count> {
    return this.crudRepository.updateAll(crud, where);
  }
}
