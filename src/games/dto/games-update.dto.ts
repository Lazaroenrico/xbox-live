import { PartialType } from "@nestjs/swagger";
import { CreateGamesDto } from "./games-create.dto";

export class UpdateGamesDto extends PartialType(CreateGamesDto){}
