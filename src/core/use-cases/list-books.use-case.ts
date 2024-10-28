import { container } from "tsyringe";
import { Book } from "../book.interface";
import Logger from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class ListBooks {
    private bookRepository: BookRepository;
    private logger: Logger;

    constructor() {
        this.bookRepository = container.resolve<BookRepository>("BookRepository");
        this.logger = container.resolve<Logger>("Logger");
    }

    async execute(): Promise<Book[]> {
       this.logger.debug("[List-books usecase] Start")
        return this.bookRepository.list();
    }
}

export default ListBooks;