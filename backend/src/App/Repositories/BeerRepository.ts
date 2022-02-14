import { EntityRepository, Repository } from 'typeorm'
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination'
import BeerEntity from '@models/BeerEntity'

@EntityRepository(BeerEntity)
class BeerRepository extends Repository<BeerEntity> {
  public getAll (): Promise<PaginationAwareObject> {
    const query = this.createQueryBuilder('b')
    return query.paginate()
  }
  
  public getBeerByTemp(temp: number) {
    
  }
}

export default BeerRepository
