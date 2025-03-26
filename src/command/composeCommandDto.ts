import { ApiProperty } from "@nestjs/swagger";

export type Operation =
| 'up'
| 'down'
| 'stop'
| 'start'
| 'delete';


export class ComposeCommandDto {
    @ApiProperty({description: 'Laboratory to work on', required: true})
    laboratoryName: string

    @ApiProperty({description: 'Operation to be executed', enum: ['up', 'down', 'stop', 'start','delete'], required: true})
    operation: Operation;
  }


