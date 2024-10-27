import { Body, Controller, Delete, Get, Path, Post, Route, SuccessResponse, Tags } from "tsoa";
import { GetBookOutputDto, GetBooksOutputDto, PostBookInputDto, PostBookOutputDto } from "./dto";
import { createBookCodec, getBookCodec } from "./book.codec";

@Route("books")
@Tags("Books")
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
        return [];
    }

    /**
     * 
     * @summary Get a book by Id
     * @param id The book identifier
     */
    @Get("{id}")
    @SuccessResponse(200)
    async getById(@Path() id: string): Promise<GetBookOutputDto> {
        const bookId = getBookCodec.decodBookId(id);

        return {
            id: "mock-id",
            author: "mock-author",
            summary: "mock-summary",
            title: "mock-title",
            totalPages: 100,
        };
    }

    /**
     * 
     * @summary Create a book
     */
    @Post()
    @SuccessResponse(201)
    async create(
        @Body() requestBody: PostBookInputDto
    ): Promise<PostBookOutputDto> {
        const decodingResult = createBookCodec.decode(requestBody);

        if(!decodingResult.success){
            throw decodingResult.error.toString();
        }
        
        return {
            id: "mock-id",
            author: "mock-author",
            summary: "mock-summary",
            title: "mock-title",
            totalPages: 100,
        };
    }

    /**
     * 
     * @summary Delete a book by Id
     */
    @Delete("{id}")
    @SuccessResponse(204)
    async delete(@Path() id: string): Promise<void> {
        const bookId = getBookCodec.decodBookId(id);

        if(!bookId.success){
            throw "Invalid book id format";
        }
        return;
    }
}