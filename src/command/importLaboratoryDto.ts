import { ApiProperty } from "@nestjs/swagger";




export class ImportLaboratoryDto {
    @ApiProperty({description: 'Path of the Laboratory to be imported', required: true})
    laboratoryPath: string;

    @ApiProperty({description: 'Image of the Laboratory to be imported', required: true})
    fileName: string;
  }


