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
exports.LoanRequestEntity = void 0;
const typeorm_1 = require("typeorm");
const tool_entity_1 = require("./tool.entity");
let LoanRequestEntity = class LoanRequestEntity {
    id;
    purpose;
    days;
    tool;
};
exports.LoanRequestEntity = LoanRequestEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LoanRequestEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], LoanRequestEntity.prototype, "purpose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], LoanRequestEntity.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tool_entity_1.ToolEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "tool_id" }),
    __metadata("design:type", tool_entity_1.ToolEntity)
], LoanRequestEntity.prototype, "tool", void 0);
exports.LoanRequestEntity = LoanRequestEntity = __decorate([
    (0, typeorm_1.Entity)("loan_requests")
], LoanRequestEntity);
//# sourceMappingURL=loan-request.entity.js.map