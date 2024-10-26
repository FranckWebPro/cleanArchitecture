import { Body, Controller, Delete, Get, Post, Route, SuccessResponse } from "tsoa";
import { GetBookOutputDto, GetBooksOutputDto, PostBookInputDto, PostBookOutputDto } from "./dto";

@Route("books")
export class BookController extends Controller {
    constructor() {
        super();
    }

    @Get()
    @SuccessResponse(200)
    async list(): Promise<GetBooksOutputDto> {
        return [];
    }

    @Get("{id}")
    @SuccessResponse(200)
    async getById(): Promise<GetBookOutputDto> {
        return {
            id: "mock-id",
            author: "mock-author",
            summary: "mock-summary",
            title: "mock-title",
            totalPages: 100,
        };
    }

    @Post()
    @SuccessResponse(201)
    async create(
        @Body() requestBody: PostBookInputDto
    ): Promise<PostBookOutputDto> {
        return {
            id: "mock-id",
            author: "mock-author",
            summary: "mock-summary",
            title: "mock-title",
            totalPages: 100,
        };
    }

    @Delete("{id}")
    @SuccessResponse(204)
    async delete(): Promise<undefined> {
        return;
    }
}