import { ApiProperty } from "@nestjs/swagger";


export type ContainerType =
| 'OS'
| 'DB';

export class Container {

  constructor(id: string, containerName: string, status: string = "") {
    this.id = id;
    this.containerName = containerName;
    this.status = status;
  }

  @ApiProperty({description: 'Laboratory to work on', required: true})
  id: string

  @ApiProperty({description: 'Laboratory to work on', required: true})
  laboratoryName: string

  @ApiProperty({description: 'Laboratory to work on', required: true})
  containerName: string

  @ApiProperty({description: 'Laboratory to work on', required: false})
  status: string

  @ApiProperty({description: 'Name of container system', required: false})
  systemName : string

  @ApiProperty({description: 'Type of container: OS or DB', required: false})
  type : ContainerType

  }


