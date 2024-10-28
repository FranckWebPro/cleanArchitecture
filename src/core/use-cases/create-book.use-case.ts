import { container } from "tsyringe";
import { BookRepository, CreateBookInput } from "../ports/database.port";
import Logger from "../ports/logger.port";

class CreateBook {
    private bookRepository: BookRepository;
    private logger: Logger;

    constructor() {
        this.bookRepository = container.resolve<BookRepository>("BookRepository");
        this.logger = container.resolve<Logger>("Logger");
    }

    async execute({ title, summary, author, totalPages}: CreateBookInput) {
        this.logger.debug("[Create-book usecase] Start")
        return this.bookRepository.create({ title, summary, author, totalPages });
    }
}

export default CreateBook;