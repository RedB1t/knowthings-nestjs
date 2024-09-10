import { Module } from '@nestjs/common';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [
    CoreModule,
    SharedModule,
    ModulesModule,
  ],
})
export class AppModule {}