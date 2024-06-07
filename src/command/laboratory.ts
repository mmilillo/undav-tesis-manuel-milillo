import { ApiProperty } from "@nestjs/swagger";

export class Laboratory {

  constructor(id: string, laboratoryName: string) {
    this.id = id;
    this.laboratoryName = laboratoryName;
  }

  @ApiProperty({description: 'Laboratory to work on', required: true})
  id: string

  @ApiProperty({description: 'Laboratory to work on', required: true})
  laboratoryName: string

  }


