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
exports.LoanRequestsModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_module_1 = require("../auth/auth.module");
const loan_request_entity_1 = require("./loan-request.entity");
const loan_requests_controller_1 = require("./loan-requests.controller");
const loan_requests_service_1 = require("./loan-requests.service");
const seed_service_1 = require("./seed.service");
const tool_entity_1 = require("./tool.entity");
let ToolsController = class ToolsController {
    tools;
    constructor(tools) {
        this.tools = tools;
    }
    findAll() {
        return this.tools.find({ order: { id: "ASC" } });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToolsController.prototype, "findAll", null);
ToolsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Controller)("tools"),
    __param(0, (0, typeorm_1.InjectRepository)(tool_entity_1.ToolEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ToolsController);
let LoanRequestsModule = class LoanRequestsModule {
};
exports.LoanRequestsModule = LoanRequestsModule;
exports.LoanRequestsModule = LoanRequestsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tool_entity_1.ToolEntity, loan_request_entity_1.LoanRequestEntity]), auth_module_1.AuthModule],
        controllers: [loan_requests_controller_1.LoanRequestsController, ToolsController],
        providers: [loan_requests_service_1.LoanRequestsService, seed_service_1.SeedService],
    })
], LoanRequestsModule);
//# sourceMappingURL=loan-requests.module.js.map