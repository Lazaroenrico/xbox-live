import { Games } from 'src/games/entities/game.entity';
import { User } from 'src/user/entities/user.entity';

export class Profile {
  id?: string;
  Title: string;
  ImageUrl: string;
  user?: User;
  games?: Games[];
  gamesFavorite?: Games[];
  createdAt?: Date;
  updateAt?: Date;

}
