import { ApiProperty } from "@nestjs/swagger";

export type Operation =
| 'up'
| 'down'
| 'stop'
| 'start';


export class ComposeCommandDto {
    @ApiProperty({description: 'Laboratory to work on', required: true})
    laboratoryName: string

    @ApiProperty({description: 'Operation to be executed', enum: ['up', 'down', 'stop', 'start'], required: true})
    operation: Operation;
  }


