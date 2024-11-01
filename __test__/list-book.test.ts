import "reflect-metadata";
import { randomUUID } from "crypto";
import { Book } from "../src/core/book.interface";
import ListBooks from "../src/core/use-cases/list-books.use-case"
import { BookRepository } from "../src/core/ports/database.port";
import { container } from "tsyringe";
import Logger from "../src/core/ports/logger.port";

describe("ListBooks", () => {
    const mock__data: Book[] = [
        {
            id: randomUUID(),
            title: "Book 1",
            author: "Author 1",
            summary: "Summary 1",
            totalPages: 100,
        },

        {        
            id: randomUUID(),
            title: "Book 2",
            author: "Author 2",
            summary: "Summary 2",
            totalPages: 200,
        }
    ]
    const mock__list = jest.fn();
    const mock__BookRepository = () => {
        return {
            list: mock__list,
        }
    }

    container.register<Partial<BookRepository>>("BookRepository", {
        useValue: mock__BookRepository(),
    })

    container.register<Partial<Logger>>("Logger", {
        useValue: {
            debug: jest.fn(),
        }
    })

    it("should return a list of books", async ()=> {
        mock__list.mockResolvedValue(mock__data);
        const response = await new ListBooks().execute();

        expect(response).toStrictEqual(mock__data);
        expect(container.resolve<BookRepository>("BookRepository").list).toHaveBeenCalled();
    })
})