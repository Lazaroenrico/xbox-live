import { Games } from 'src/games/entities/game.entity';
import { User } from 'src/user/entities/user.entity';

export class Profile {
  id?: string;
  Title: string;
  ImageUrl: string;
  User?: User;
  games?: Games[];

  createdAt?: Date;
  updateAt?: Date;
}
