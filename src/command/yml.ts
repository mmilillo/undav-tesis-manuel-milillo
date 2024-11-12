import { ApiProperty } from "@nestjs/swagger";
import { Container } from "./container";


export class Yml {

  constructor(id: string, laboratoryName: string, status: string = "") {
    this.id = id;
    this.laboratoryName = laboratoryName;
    this.status = status;
  }

  @ApiProperty({description: 'Laboratory to work on', required: true})
  id: string

  @ApiProperty({description: 'Laboratory to work on', required: true})
  laboratoryName: string

  @ApiProperty({description: 'Laboratory to work on', required: false})
  status: string

  @ApiProperty({description: 'Name of container system', required: false})
  systemName : string

  @ApiProperty({description: 'Containers of laboratory', required: false})
  containers : Container[];

  }





interface YamlDTO {
    image: string;
    ports: string[];
    environment: string[];
  }