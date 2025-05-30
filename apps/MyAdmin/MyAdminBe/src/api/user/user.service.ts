import { Repository } from 'typeorm';
import { md5 } from 'src/utils/md5';
import { RedisService } from 'src/helper/redis/redis.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserDto, LoginUserVo } from './dto/login-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @Inject(RedisService)
  private redisService: RedisService;

  async initData() {
    const user1 = new User();
    user1.userName = '老板';
    user1.password = md5('116161888');
    user1.email = '770899447@qq.com';
    user1.isAdmin = true;
    user1.phoneNumber = '15605659008';

    const user2 = new User();
    user2.userName = '销售';
    user2.password = md5('123456abc');
    user2.email = '2587537995@qq.com';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1];
    user2.roles = [role2];

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];

    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
  }

  async register(user: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha_${user.email}`);

    if (!captcha)
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);

    if (user.captcha !== captcha)
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);

    const foundUser = await this.userRepository.findOneBy({
      userName: user.userName,
    });

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.userName = user.userName;
    newUser.password = md5(user.password);
    newUser.email = user.email;

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async login(
    loginUserDto: LoginUserDto,
    isAdmin: boolean,
  ): Promise<LoginUserVo> {
    const user = await this.userRepository.findOne({
      where: {
        userName: loginUserDto.userName,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    if (user.password !== md5(loginUserDto.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    const vo = new LoginUserVo();
    vo.userInfo = {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      headPic: user.headPic,
      nickName: user.nickName,
      phoneNumber: user.phoneNumber,
      createTime: user.createTime,
      isFrozen: user.isFrozen,
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) arr.push(permission);
        });
        return arr;
      }, []),
    };
    return vo;
  }

  async findUserById(userId: number, isAdmin: boolean) {
    const user = await this.userRepository.findOne({
      where: {
        userId,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });
    return {
      userId: user.userId,
      userName: user.userName,
      isAdmin: user.isAdmin,
      roles: user.roles.map((item) => item.name),
      permissions: user.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };
  }
}
