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
exports.LoanRequestsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const request_validation_pipe_1 = require("../common/request-validation.pipe");
const create_loan_request_dto_1 = require("./dto/create-loan-request.dto");
const list_loan_requests_dto_1 = require("./dto/list-loan-requests.dto");
const loan_requests_service_1 = require("./loan-requests.service");
let LoanRequestsController = class LoanRequestsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(query) {
        return this.service.findAll(query.toolId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    create(dto) {
        return this.service.create(dto);
    }
};
exports.LoanRequestsController = LoanRequestsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(request_validation_pipe_1.requestValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_loan_requests_dto_1.ListLoanRequestsDto]),
    __metadata("design:returntype", void 0)
], LoanRequestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LoanRequestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(request_validation_pipe_1.requestValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loan_request_dto_1.CreateLoanRequestDto]),
    __metadata("design:returntype", void 0)
], LoanRequestsController.prototype, "create", null);
exports.LoanRequestsController = LoanRequestsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Controller)("loan-requests"),
    __metadata("design:paramtypes", [loan_requests_service_1.LoanRequestsService])
], LoanRequestsController);
//# sourceMappingURL=loan-requests.controller.js.map