"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const loan_requests_module_1 = require("./loan-requests/loan-requests.module");
let HealthController = class HealthController {
    health() {
        return { status: "ok" };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "health", null);
HealthController = __decorate([
    (0, common_1.Controller)("health")
], HealthController);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "127.0.0.1",
                port: Number(process.env.DB_PORT ?? 5452),
                username: "tool_lab",
                password: "tool_lab_local",
                database: "tool_lab",
                autoLoadEntities: true,
                // Solo para la base local y exclusiva de este ejercicio, no para producción.
                synchronize: true,
                retryAttempts: 4,
                retryDelay: 1000,
            }),
            auth_module_1.AuthModule,
            loan_requests_module_1.LoanRequestsModule,
        ],
        controllers: [HealthController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map