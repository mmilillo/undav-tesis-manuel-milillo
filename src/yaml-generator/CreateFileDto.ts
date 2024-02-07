import { ApiProperty } from "@nestjs/swagger";

type OperatingSystem =
| 'ubuntu'
| 'windows';

type DataBase =
| 'postgres'
| 'mysql';



export class CreateFileDto {
    @ApiProperty({description: 'Operating system to be created', enum: ['ubuntu', 'windows']})
    os: OperatingSystem;

    @ApiProperty({description: 'Data base to be created', enum: ['postgres', 'mysql']})
    db? : DataBase;
  }


