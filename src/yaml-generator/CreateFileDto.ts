import { ApiProperty } from "@nestjs/swagger";

type OperatingSystem =
| 'ubuntu'
| 'windows';

type DataBase =
| 'postgres'
| 'mysql';



export class CreateFileDto {
    @ApiProperty({description: 'Laboratory name to be created', required: true})
    laboratoryName: string

    @ApiProperty({description: 'Operating system to be created', enum: ['ubuntu', 'windows'], required: true})
    os: OperatingSystem;

    @ApiProperty({description: 'Data base to be created', enum: ['postgres', 'mysql'], required: false})
    db? : DataBase;
  }


