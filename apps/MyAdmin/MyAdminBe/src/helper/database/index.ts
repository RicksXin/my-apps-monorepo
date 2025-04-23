import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/api/order/entities/order.entity';
import { Product } from 'src/api/product/entities/product.entity';
import { Permission } from 'src/api/user/entities/permission.entity';
import { Role } from 'src/api/user/entities/role.entity';
import { User } from 'src/api/user/entities/user.entity';

export const Database = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'sean',
  database: 'mysql2',
  synchronize: true,
  logging: true,
  entities: [User, Role, Permission, Order, Product],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPluguin: 'sha256_password',
  },
});
