import {MigrationInterface, QueryRunner} from "typeorm";
import { v4 as uuidv4 } from 'uuid'

export class insertBeerTable1644444577807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const beers = [
            {
                "beer_type": "Weissbier",
                "min_temp": -1,
                "max_temp": 3
            },
            {
                "beer_type": "Pilsens",
                "min_temp": -2,
                "max_temp": 4
            },
            {
                "beer_type": "Weizenbier",
                "min_temp": -4,
                "max_temp": 6
            },
            {
                "beer_type": "Red ale",
                "min_temp": -5,
                "max_temp": 5
            },
            {
                "beer_type": "India pale ale",
                "min_temp": -6,
                "max_temp": 7
            },
            {
                "beer_type": "IPA",
                "min_temp": -7,
                "max_temp": 10
            },
            {
                "beer_type": "Dunkel",
                "min_temp": -8,
                "max_temp": 2
            },
            {
                "beer_type": "Imperial Stouts",
                "min_temp": -10,
                "max_temp": 13
            },
            {
                "beer_type": "Brown ale",
                "min_temp": 0,
                "max_temp": 14
            }
        ]

        for (const beer of beers) {
            const id = uuidv4()
            const sql = `insert into beer values('${id}', '${beer.beer_type}', '${beer.min_temp}', '${beer.max_temp}', '2022-04-02 22:00:00')`;
            await queryRunner.query(sql)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('truncate table categoria')
    }

}
