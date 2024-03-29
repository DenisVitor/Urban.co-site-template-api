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
  HttpCode,
} from '@nestjs/common';
import { CommentariesService } from './commentaries.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { UpdateCommentaryDto } from './dto/update-commentary.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('items/:itemId/commentaries')
export class CommentariesController {
  constructor(private readonly commentariesService: CommentariesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCommentaryDto: CreateCommentaryDto,
    @Param() itemId: { itemId: string },
    @Request() req,
  ) {
    return this.commentariesService.create(
      createCommentaryDto,
      itemId,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Param(':itemId') itemId: string, @Request() req) {
    return this.commentariesService.findOne(req.user.id, itemId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(
    @Request() req,
    @Param() itemId: { itemId: string },
    @Body() updateCommentaryDto: UpdateCommentaryDto,
  ) {
    return this.commentariesService.update(
      req.user.id,
      itemId,
      updateCommentaryDto,
    );
  }

  @HttpCode(204)
  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Request() req, @Param(':itemId') itemId: string) {
    return this.commentariesService.remove(req.user.id, itemId);
  }
}
