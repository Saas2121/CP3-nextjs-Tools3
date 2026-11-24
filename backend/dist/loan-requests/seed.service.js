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
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const loan_request_entity_1 = require("./loan-request.entity");
const tool_entity_1 = require("./tool.entity");
let SeedService = class SeedService {
    dataSource;
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async onApplicationBootstrap() {
        await this.dataSource.transaction(async (manager) => {
            const tools = manager.getRepository(tool_entity_1.ToolEntity);
            if (await tools.count())
                return;
            const [drill, sewingMachine] = await tools.save([
                { name: "Electric drill", maxLoanDays: 3 },
                { name: "Sewing machine", maxLoanDays: 7 },
            ]);
            await manager.getRepository(loan_request_entity_1.LoanRequestEntity).save([
                { purpose: "Build a display stand", days: 2, tool: drill },
                { purpose: "Prepare workshop materials", days: 4, tool: sewingMachine },
            ]);
        });
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], SeedService);
//# sourceMappingURL=seed.service.js.map