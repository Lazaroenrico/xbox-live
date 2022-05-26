import { User } from 'src/user/entities/user.entity';

export class Profile {
  id?: string;
  Title: string;
  ImageUrl: string;
  User?: User;

  createdAt?: Date;
  updateAt?: Date;
}
