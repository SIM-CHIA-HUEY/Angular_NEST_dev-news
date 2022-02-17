import { Module, HttpModule } from '@nestjs/common';
import { TwitterController } from './twitter.controller';

@Module({

  imports: [HttpModule],
  controllers: [TwitterController],
  providers: [],
  exports: []
})
export class TwitterModule { }