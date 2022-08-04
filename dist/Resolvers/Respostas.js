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
exports.RespostaUsuario = exports.RespostaPost = exports.ErroEmCampo = void 0;
const type_graphql_1 = require("type-graphql");
const PostEntidade_1 = require("../Entidades/PostEntidade");
const UsuarioEntidade_1 = require("../Entidades/UsuarioEntidade");
let ErroEmCampo = class ErroEmCampo {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErroEmCampo.prototype, "Campo", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErroEmCampo.prototype, "Mensagem", void 0);
ErroEmCampo = __decorate([
    (0, type_graphql_1.ObjectType)()
], ErroEmCampo);
exports.ErroEmCampo = ErroEmCampo;
let RespostaPost = class RespostaPost {
};
__decorate([
    (0, type_graphql_1.Field)(() => [ErroEmCampo], { nullable: true }),
    __metadata("design:type", Array)
], RespostaPost.prototype, "Erros", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PostEntidade_1.Post, { nullable: true }),
    __metadata("design:type", PostEntidade_1.Post)
], RespostaPost.prototype, "Post", void 0);
RespostaPost = __decorate([
    (0, type_graphql_1.ObjectType)()
], RespostaPost);
exports.RespostaPost = RespostaPost;
let RespostaUsuario = class RespostaUsuario {
};
__decorate([
    (0, type_graphql_1.Field)(() => [ErroEmCampo], { nullable: true }),
    __metadata("design:type", Array)
], RespostaUsuario.prototype, "Erros", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UsuarioEntidade_1.Usuario, { nullable: true }),
    __metadata("design:type", UsuarioEntidade_1.Usuario)
], RespostaUsuario.prototype, "Usuario", void 0);
RespostaUsuario = __decorate([
    (0, type_graphql_1.ObjectType)()
], RespostaUsuario);
exports.RespostaUsuario = RespostaUsuario;
//# sourceMappingURL=Respostas.js.map