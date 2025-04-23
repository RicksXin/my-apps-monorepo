
import { RedisService } from 'src/helper/redis/redis.service';
import { Controller, Post, Get, Body, Inject, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Post('register-captcha')
  async captcha(@Body() params: { address: string }) {
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(`captcha_${params.address}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: params.address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是${code}</p>`,
    });
    return '发送成功';
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.userService.register(registerUserDto);
  }

  @Post('refresh') 
  async refresh(@Body() params: {refreshTooken: string}) {
    try {
      const data = this.jwtService.verify(params.refreshTooken)
      const user = await this.userService.findUserById(data.userId, false)
      const access_token = this.jwtService.sign({
        userId: user.userId,
        userName: user.userName,
        roles: user.roles,
        permission: user.permissions
      }, {
        expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
      })
      const refresh_token = this.jwtService.sign({
        userId: user.userId
      }, {
        expiresIn: this.configService.get('jwt_refresh_token_expires_time') || '7d'
      })
      return {
        access_token,
        refresh_token
      }
    } catch(err) {
      throw new UnauthorizedException('token 已失效，请重新登录')
    }
  }

  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    const user = await this.userService.login(loginUser, false);
    user.accessToken = this.jwtService.sign({
      userId: user.userInfo.userId,
      userName: user.userInfo.userName,
      roles: user.userInfo.roles,
      permissions: user.userInfo.permissions,
    }, {
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    })
    user.refreshToken = this.jwtService.sign({
      userId: user.userInfo.userId
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expires_time') || '7d'
    })
    console.log(user);
    return user;
  }
}
