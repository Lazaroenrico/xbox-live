import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    example: 'George059',
  })
  Title: string;

  @IsString()
  @ApiProperty({
    example:
      'https://filestore.community.support.microsoft.com/api/profileimages/6b031d78-c348-4636-9e2a-09b5503ba0b8',
  })
  ImageUrl: string;
}
