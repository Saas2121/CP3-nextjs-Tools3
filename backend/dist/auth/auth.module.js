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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const node_crypto_1 = require("node:crypto");
const passport_jwt_1 = require("passport-jwt");
const class_validator_1 = require("class-validator");
const request_validation_pipe_1 = require("../common/request-validation.pipe");
const user = { id: 1, email: "student@example.com" };
const jwtSecret = process.env.JWT_SECRET || (0, node_crypto_1.randomBytes)(48).toString("hex");
// Cuenta ficticia, exclusiva del entorno local de evaluación.
const salt = (0, node_crypto_1.randomBytes)(16);
const passwordHash = (0, node_crypto_1.scryptSync)("ToolLoan2026", salt, 64);
class LoginDto {
    email;
    password;
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(128),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
let AuthService = class AuthService {
    jwt;
    constructor(jwt) {
        this.jwt = jwt;
    }
    async login(dto) {
        const candidate = (0, node_crypto_1.scryptSync)(dto.password, salt, 64);
        if (dto.email.trim().toLowerCase() !== user.email || !(0, node_crypto_1.timingSafeEqual)(candidate, passwordHash)) {
            throw new common_1.UnauthorizedException("Invalid credentials.");
        }
        return { access_token: await this.jwt.signAsync({ sub: user.id }) };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            algorithms: ["HS256"],
        });
    }
    validate(payload) {
        if (payload.sub !== user.id)
            throw new common_1.UnauthorizedException();
        return user;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
let AuthController = class AuthController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    login(dto) {
        return this.auth.login(dto);
    }
};
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)(request_validation_pipe_1.requestValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: "3h", algorithm: "HS256" } }),
        ],
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy],
        exports: [passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map