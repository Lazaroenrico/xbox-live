import { Module } from "@nestjs/common";
import { GenderController } from "./gender.controller";

@Module({
  controllers: [GenderController],
  providers: [],
})
export class GenderModule {}
