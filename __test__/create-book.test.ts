import "reflect-metadata";
import { randomUUID } from "crypto";
import { BookRepository } from "../src/core/ports/database.port";
import { container } from "tsyringe";
import Logger from "../src/core/ports/logger.port";
import CreateBook from "../src/core/use-cases/create-book.use-case";
import { Book } from "../src/core/book.interface";

describe("CreateBook", () => {
    const id: string = randomUUID();
    const mock__data: Book =  {
        id: randomUUID(),
        title: "Book 1",
        author: "Author 1",
        summary: "Summary 1",
        totalPages: 100,
    }

    const mock__create = jest.fn();
    const mock__BookRepository = () => {
        return {
            create: mock__create,
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

    it("should create the book", async ()=> {
        mock__create.mockResolvedValue(mock__data);
        const body = {
            title: "Book 1",
            author: "Author 1",
            summary: "Summary 1",
            totalPages: 100,
        }

        const response = await new CreateBook().execute(body);

        expect(response).toStrictEqual(mock__data);
        expect(container.resolve<BookRepository>("BookRepository").create).toHaveBeenCalledWith(body);
    });
})