import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Book {

    @PrimaryColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    summary: string;
    
    @Column()
    author: string;

    @Column()
    totalPages: number;

    @Column({
        type: "time without time zone",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;
    
}

export default Book;