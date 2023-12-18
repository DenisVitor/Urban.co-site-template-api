import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('commentaries')
export class CommentariesController {
  constructor(private readonly commentariesService: CommentariesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCommentaryDto: CreateCommentaryDto, @Request() req) {
    return this.commentariesService.create(createCommentaryDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.commentariesService.findAll();
  }

  @Get(':itemId')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('itemId') itemId: string, @Request() req) {
    return this.commentariesService.findOne(req.user.id, itemId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Request() req,
    @Param() itemId: string,
    @Body() updateCommentaryDto: UpdateCommentaryDto,
  ) {
    return this.commentariesService.update(
      req.user.id,
      itemId,
      updateCommentaryDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req, @Param('id') itemId: string) {
    return this.commentariesService.remove(req.user.id, itemId);
  }
}
