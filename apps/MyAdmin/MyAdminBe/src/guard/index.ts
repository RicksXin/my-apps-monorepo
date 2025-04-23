import { APP_GUARD } from "@nestjs/core";
import { LoginGuard } from "./login/login.guard";
import { PermissionGuard } from "./permission/permission.guard";

export default [
  {
    provide: APP_GUARD,
    useClass: LoginGuard
  },
  {
    provide: APP_GUARD,
    useClass: PermissionGuard
  },
]