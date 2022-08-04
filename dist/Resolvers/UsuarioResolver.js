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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioResolver = void 0;
const type_graphql_1 = require("type-graphql");
const UsuarioEntidade_1 = require("../Entidades/UsuarioEntidade");
const argon2_1 = __importDefault(require("argon2"));
const Respostas_1 = require("./Respostas");
let UsuarioResolver = class UsuarioResolver {
    EncontrarTodosUsuarios({ em }) {
        return em.fork().find(UsuarioEntidade_1.Usuario, {});
    }
    EncontrarUsuario(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield em.fork().findOne(UsuarioEntidade_1.Usuario, { id });
            if (!usuario) {
                return {
                    Erros: [{
                            Campo: 'Encontrar usuario',
                            Mensagem: 'Usuario nao encontrado'
                        }]
                };
            }
            return {
                Usuario: usuario
            };
        });
    }
    RegistrarUsuario(NomeDeUsuario, Senha, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const HashSenha = yield argon2_1.default.hash(Senha);
            const usuario = em.fork().create(UsuarioEntidade_1.Usuario, {
                NomeDeUsuario: NomeDeUsuario,
                Senha: HashSenha
            });
            if (usuario.NomeDeUsuario === (undefined || null) || usuario.NomeDeUsuario.length < 2) {
                return {
                    Erros: [{
                            Campo: 'Registrar usuario',
                            Mensagem: 'Nome de usuario inválido (Minimo 2 caracteres)'
                        }]
                };
            }
            else if (Senha === (undefined || null) || Senha.length < 4) {
                return {
                    Erros: [{
                            Campo: 'Registrar usuario',
                            Mensagem: 'Senha inválida (Minimo 4 caracteres)'
                        }]
                };
            }
            try {
                yield em.fork().persistAndFlush(usuario);
            }
            catch (Erro) {
                if (Erro.code === '23505') {
                    return {
                        Erros: [{
                                Campo: 'Registrar usuario',
                                Mensagem: 'Nome de usuario ja existe'
                            }]
                    };
                }
            }
            return {
                Usuario: usuario
            };
        });
    }
    GetSessionUsuario({ req, em }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            const usuario = yield em.fork().findOne(UsuarioEntidade_1.Usuario, { id: req.session.userId });
            return usuario;
        });
    }
    LoginUsuario(NomeDeUsuario, Senha, { em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield em.fork().findOne(UsuarioEntidade_1.Usuario, { NomeDeUsuario });
            if (!usuario) {
                return {
                    Erros: [{
                            Campo: 'Login usuario',
                            Mensagem: 'Usuario nao encontrado',
                        }]
                };
            }
            const LoginValido = yield argon2_1.default.verify(usuario.Senha, Senha);
            if (!LoginValido) {
                return {
                    Erros: [{
                            Campo: 'Login usuario',
                            Mensagem: 'Senha Invalida',
                        }]
                };
            }
            req.session.userId = usuario.id;
            return {
                Usuario: usuario
            };
        });
    }
    EditarUsuario(id, NomeDeUsuario, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield em.fork().findOne(UsuarioEntidade_1.Usuario, { id });
            if (!usuario) {
                return {
                    Erros: [{
                            Campo: 'Editar usuario',
                            Mensagem: 'Usuario nao encontrado',
                        }]
                };
            }
            if (!(usuario.NomeDeUsuario === (undefined || null) || usuario.NomeDeUsuario.length < 2)) {
                usuario.NomeDeUsuario = NomeDeUsuario;
                yield em.fork().persistAndFlush(usuario);
            }
            return {
                Usuario: usuario
            };
        });
    }
    DeletarUsuario(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield em.fork().findOne(UsuarioEntidade_1.Usuario, { id });
            if (!usuario) {
                return {
                    Erros: [{
                            Campo: 'Deletar usuario',
                            Mensagem: 'Usuario nao encontrado',
                        }]
                };
            }
            yield em.fork().nativeDelete(UsuarioEntidade_1.Usuario, { id });
            return {
                Usuario: usuario
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [UsuarioEntidade_1.Usuario]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "EncontrarTodosUsuarios", null);
__decorate([
    (0, type_graphql_1.Query)(() => Respostas_1.RespostaUsuario, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "EncontrarUsuario", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Respostas_1.RespostaUsuario),
    __param(0, (0, type_graphql_1.Arg)('NomeDeUsuario')),
    __param(1, (0, type_graphql_1.Arg)('Senha')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "RegistrarUsuario", null);
__decorate([
    (0, type_graphql_1.Query)(() => UsuarioEntidade_1.Usuario, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "GetSessionUsuario", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Respostas_1.RespostaUsuario),
    __param(0, (0, type_graphql_1.Arg)('NomeDeUsuario')),
    __param(1, (0, type_graphql_1.Arg)('Senha')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "LoginUsuario", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Respostas_1.RespostaUsuario, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('NomeDeUsuario', () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "EditarUsuario", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Respostas_1.RespostaUsuario),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "DeletarUsuario", null);
UsuarioResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UsuarioResolver);
exports.UsuarioResolver = UsuarioResolver;
//# sourceMappingURL=UsuarioResolver.js.map