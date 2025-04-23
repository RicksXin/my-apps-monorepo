import { IsNotEmpty } from 'class-validator';

interface UserInfo {
  userId: number;

  userName: string;

  email: string;

  phoneNumber: string;

  nickName: string;

  headPic: string;

  isFrozen: boolean;

  isAdmin: boolean;

  createTime: Date;

  roles: string[];

  permissions: string[];
}

export class LoginUserVo {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}

export class LoginUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  userName: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
