import { Controller, Get, Post, Body, Param, Put, Delete, ValidationPipe } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UniversityEntity } from './university.entity';

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createUniversityDto: CreateUniversityDto): Promise<{
    status: number;
    mensaje: string;
    university: UniversityEntity;
  }> {
    return await this.universityService.create(createUniversityDto);
  }

  @Get()
  async findAll(): Promise<{
    status: number;
    mensaje: string;
    universities: UniversityEntity[];
  }> {
    return await this.universityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{
    status: number;
    mensaje: string;
    university: UniversityEntity;
  }> {
    return await this.universityService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUniversityDto: Partial<CreateUniversityDto>
  ): Promise<{
    status: number;
    mensaje: string;
    university: UniversityEntity;
  }> {
    return await this.universityService.update(+id, updateUniversityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{
    status: number;
    mensaje: string;
  }> {
    return await this.universityService.remove(+id);
  }
}
