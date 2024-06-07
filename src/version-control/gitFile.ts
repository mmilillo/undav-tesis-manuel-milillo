import { ApiProperty } from "@nestjs/swagger";

export class GitFile {

  constructor(status: string, name: string) {
    this.status = status;
    this.name = name;
  }

  @ApiProperty({description: 'File status', required: true})
  status: string

  @ApiProperty({description: 'File name', required: true})
  name: string

  }


