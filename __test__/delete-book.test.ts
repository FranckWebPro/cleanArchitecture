import "reflect-metadata";
import { randomUUID } from "crypto";
import { BookRepository } from "../src/core/ports/database.port";
import { container } from "tsyringe";
import Logger from "../src/core/ports/logger.port";
import DeleteBook from "../src/core/use-cases/delete-book.use-case";

describe("DeleteBook", () => {
    const id: string = randomUUID();

    const mock__delete = jest.fn();
    const mock__BookRepository = () => {
        return {
            delete: mock__delete,
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

    it("should delete the book with id", async ()=> {
        mock__delete.mockResolvedValue(mock__delete);
        const response = await new DeleteBook().execute(id);

        expect(response).toBeUndefined();
        expect(container.resolve<BookRepository>("BookRepository").delete).toHaveBeenCalledWith(id);
    });

    it("should return not found  withbook with id", async ()=> {
        mock__delete.mockResolvedValue(false);
        const response = await new DeleteBook().execute(id);

        expect(response).toStrictEqual("BOOK_NOT_FOUND");
    });
})