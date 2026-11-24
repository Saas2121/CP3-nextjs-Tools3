"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidationPipe = void 0;
const common_1 = require("@nestjs/common");
exports.requestValidationPipe = new common_1.ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
});
//# sourceMappingURL=request-validation.pipe.js.map