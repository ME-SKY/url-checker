import { IsArray, IsUrl, ArrayMinSize } from 'class-validator';

export class CreateJobDto {

  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  urls!: string[];

}