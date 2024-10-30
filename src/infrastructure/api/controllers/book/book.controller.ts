import { Body, Controller, Delete, Get, Path, Post, Response, Route, Security, SuccessResponse, Tags } from "tsoa";
import { GetBookOutputDto, GetBooksOutputDto, PostBookInputDto, PostBookOutputDto } from "./dto";
import { createBookCodec, getBookCodec } from "./book.codec";

import CreateBookUseCase from "../../../../core/use-cases/create-book.use-case";
import DeleteBookUseCase from "../../../../core/use-cases/delete-book.use-case";
import GetBookUseCase from "../../../../core/use-cases/get-book.use-case";
import ListBooksUseCase from "../../../../core/use-cases/list-books.use-case";
import { InvalidInputError, NotFoundError } from "../../error-handler";

@Route("books")
@Tags("Books")
@Security("jwt")
export class BookController extends Controller {
    constructor() {
        super();
    }

    /**
     * 
     * @summary Get all books
     */
    @Get()
    @SuccessResponse(200)
    async list(): Promise<GetBooksOutputDto> {
        return await new ListBooksUseCase().execute();
    }

    /**
     * 
     * @summary Get a book by Id
     * @param id The book identifier
     */
    @Get("{id}")
    @SuccessResponse(200)
    @Response(400, "Invalid request params")
    @Response(404, "Not found")
    async getById(@Path() id: string): Promise<GetBookOutputDto> {
        const bookId = getBookCodec.decodBookId(id);
        if(!bookId.success){
            throw new InvalidInputError("Invalid book id format");
        }

        const book = await new GetBookUseCase().execute(bookId.data);
        if(book === "BOOK_NOT_FOUND") {
            throw new NotFoundError("BOOK_NOT_FOUND");
        }
        return book;
    }

    /**
     * 
     * @summary Create a book
     */
    @Post()
    @SuccessResponse(201)
    @Response(400, "Invalid request params")
    async create(
        @Body() requestBody: PostBookInputDto
    ): Promise<PostBookOutputDto> {
        const decodingResult = createBookCodec.decode(requestBody);

        if(!decodingResult.success){
            throw new InvalidInputError(decodingResult.error.toString());
        }
        
        return await new CreateBookUseCase().execute(requestBody);
    }

    /**
     * 
     * @summary Delete a book by Id
     */
    @Delete("{id}")
    @SuccessResponse(204)
    @Response(404, "Not found")
    async delete(@Path() id: string): Promise<void> {
        const bookId = getBookCodec.decodBookId(id);

        if(!bookId.success){
            throw "Invalid book id format";
        }
        const result = await new DeleteBookUseCase().execute(bookId.data);

        if(result === "BOOK_NOT_FOUND") {
            throw new NotFoundError("BOOK_NOT_FOUND");
        }
    }
}