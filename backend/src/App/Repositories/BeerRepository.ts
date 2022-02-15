import { EntityRepository, Repository } from 'typeorm'
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination'
import BeerEntity from '@models/BeerEntity'

@EntityRepository(BeerEntity)
class BeerRepository extends Repository<BeerEntity> {
  public getAll (): Promise<PaginationAwareObject> {
    const query = this.createQueryBuilder('b')
    return query.paginate()
  }

  public getBeerByTemp (temp: number) {
    const sql = `select beer_type
                  from beer
                  where abs($1 - ((min_temp + max_temp) / 2)) = (select min(abs($1 - ((min_temp + max_temp) / 2))) from beer)
                  order by beer_type
                  limit 1;`
    return this.query(sql, [temp])
  }
}

export default BeerRepository
