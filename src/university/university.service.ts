import { Injectable, NotFoundException, ConflictException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { UniversityEntity } from './university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { normalizeForComparison, normalizeForDisplay, formatForResponse } from '../utils';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(UniversityEntity)
    private readonly universityRepository: Repository<UniversityEntity>,
  ) {}

  private formatUniversityForResponse(university: UniversityEntity) {
    return {
      id: university.id,
      name: formatForResponse(university.name)
    };
  }

  async create(createUniversityDto: CreateUniversityDto): Promise<{
    status: number;
    mensaje: string;
    university: UniversityEntity;
  }> {
    const normalizedName = normalizeForComparison(createUniversityDto.name);
    
    const existingUniversities = await this.universityRepository.find();
    const duplicateExists = existingUniversities.some(university => 
      normalizeForComparison(university.name) === normalizedName
    );

    if (duplicateExists) {
      throw new ConflictException('Ya existe una universidad con ese nombre');
    }

    const universityData = {
      ...createUniversityDto,
      name: normalizeForDisplay(createUniversityDto.name)
    };

    const university = this.universityRepository.create(universityData);
    const savedUniversity = await this.universityRepository.save(university);

    return {
      status: HttpStatus.CREATED,
      mensaje: 'Universidad creada exitosamente',
      university: this.formatUniversityForResponse(savedUniversity),
    };
  }

  async findAll(): Promise<{
    status: number;
    mensaje: string;
    universities: any[];
  }> {
    const universities = await this.universityRepository.find();
    return {
      status: HttpStatus.OK,
      mensaje: 'Universidades obtenidas exitosamente',
      universities: universities.map(university => this.formatUniversityForResponse(university)),
    };
  }

  async findOne(id: number): Promise<{
    status: number;
    mensaje: string;
    university: any;
  }> {
    const university = await this.universityRepository.findOne({ where: { id } });
    if (!university) {
      throw new NotFoundException(`No existe una universidad con ID ${id}`);
    }
    return {
      status: HttpStatus.OK,
      mensaje: 'Universidad obtenida exitosamente',
      university: this.formatUniversityForResponse(university),
    };
  }

  async update(id: number, updateData: Partial<CreateUniversityDto>): Promise<{
    status: number;
    mensaje: string;
    university: any;
  }> {
    const university = await this.universityRepository.findOne({ where: { id } });
    if (!university) {
      throw new NotFoundException(`No existe una universidad con ID ${id}`);
    }

    if (updateData.name) {
      const normalizedName = normalizeForComparison(updateData.name);
      
      const existingUniversities = await this.universityRepository.find({
        where: { id: Not(id) }
      });
      
      const duplicateExists = existingUniversities.some(otherUniversity => 
        normalizeForComparison(otherUniversity.name) === normalizedName
      );

      if (duplicateExists) {
        throw new ConflictException('Ya existe otra universidad con ese nombre');
      }

      updateData.name = normalizeForDisplay(updateData.name);
    }
    
    await this.universityRepository.update(id, updateData);
    const updatedUniversity = await this.universityRepository.findOne({ where: { id } }) as UniversityEntity;
    
    return {
      status: HttpStatus.OK,
      mensaje: 'Universidad actualizada exitosamente',
      university: this.formatUniversityForResponse(updatedUniversity),
    };
  }

  async remove(id: number): Promise<{
    status: number;
    mensaje: string;
  }> {
    const university = await this.universityRepository.findOne({ where: { id } });
    if (!university) {
      throw new NotFoundException(`No existe una universidad con ID ${id}`);
    }
    
    await this.universityRepository.delete(id);
    
    return {
      status: HttpStatus.OK,
      mensaje: 'Universidad eliminada exitosamente',
    };
  }
}