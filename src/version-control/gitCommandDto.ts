import { ApiProperty } from "@nestjs/swagger";

export type Operation =
| 'reset'
| 'status'
| 'add'
| 'commit'
| 'tag';


export class GitCommandDto {
    @ApiProperty({description: 'Laboratory to work on', required: true})
    laboratoryName: string

    //@ApiProperty({description: 'Operation to be executed', enum: ['reset', 'status', 'add', 'commit', 'tag'], required: true})
    //operation: Operation;

    @ApiProperty({description: 'Operation to be executed', enum: ['reset', 'status', 'add', 'commit', 'tag'], required: true})
    message: string;
  }


