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
exports.LoanRequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const loan_request_entity_1 = require("./loan-request.entity");
const tool_entity_1 = require("./tool.entity");
let LoanRequestsService = class LoanRequestsService {
    requests;
    tools;
    constructor(requests, tools) {
        this.requests = requests;
        this.tools = tools;
    }
    findAll(toolId) {
        return this.requests.find({
            where: toolId ? { tool: { id: toolId } } : {},
            relations: { tool: true },
            order: { id: "ASC" }
        });
        // TODO BACK-A: recibir el filtro y aplicarlo en la consulta del repositorio.
    }
    async findOne(id) {
        const request = await this.requests.findOne({ where: { id }, relations: { tool: true } });
        if (!request)
            throw new common_1.NotFoundException("Loan request not found.");
        return request;
    }
    async create(dto) {
        const tool = await this.tools.findOneBy({ id: dto.toolId });
        if (!tool)
            throw new common_1.NotFoundException("Tool not found.");
        if (dto.days > tool.maxLoanDays) {
            throw new common_1.ConflictException("Requested days exceed the maximum allowed for this tool.");
        }
        // TODO BACK-B: aplicar la regla de duración antes de guardar la solicitud.
        const request = this.requests.create({ purpose: dto.purpose, days: dto.days, tool });
        return this.requests.save(request);
    }
};
exports.LoanRequestsService = LoanRequestsService;
exports.LoanRequestsService = LoanRequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(loan_request_entity_1.LoanRequestEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(tool_entity_1.ToolEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LoanRequestsService);
//# sourceMappingURL=loan-requests.service.js.map