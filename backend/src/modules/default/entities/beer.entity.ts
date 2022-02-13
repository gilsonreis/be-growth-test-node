import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class BeerEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public beer_type: string;

    @Column()
    public min_temp: number;

    @Column()
    public max_temp: number;

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

    @BeforeInsert()
    public createdAt () {
        this.created_at = new Date()
    }

    @BeforeUpdate()
    public updatedAt () {
        this.updated_at = new Date()
    }
}
