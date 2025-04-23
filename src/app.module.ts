import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './helper/database';
import guard from './guard';
import { RedisModule } from './helper/redis/redis.module';
import { EmailModule } from './api/email/email.module';
import { OrderModule } from './api/order/order.module';
import { ProductModule } from './api/product/product.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    OrderModule,
    ProductModule,
    Database,
    RedisModule,
    UserModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m'
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...guard
  ],
})
export class AppModule {}
