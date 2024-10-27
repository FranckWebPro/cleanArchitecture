import { Column, Entity, PrimaryColumn } from "typeorm";

import { Book as BookCoreEntity } from "../../../../core/book.interface";

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

    toDomainEntity(): BookCoreEntity {
        return {
            id: this.id,
            title: this.title,
            summary: this.summary,
            author: this.author,
            totalPages: this.totalPages
        }
    }
}

export default Book;