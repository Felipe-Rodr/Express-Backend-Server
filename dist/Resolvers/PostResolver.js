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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const PostEntidade_1 = require("../Entidades/PostEntidade");
const Respostas_1 = require("./Respostas");
let PostResolver = class PostResolver {
    EncontrarTodosPosts({ em }) {
        return em.fork().find(PostEntidade_1.Post, {});
    }
    EncontrarPost(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield em.fork().findOne(PostEntidade_1.Post, { id });
            if (!post) {
                return {
                    Erros: [{
                            Campo: 'Encontrar post',
                            Mensagem: 'Post nao encontrado'
                        }]
                };
            }
            return {
                Post: post
            };
        });
    }
    CriarPost(Titulo, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = em.fork().create(PostEntidade_1.Post, {
                Titulo: Titulo
            });
            if (post.Titulo === (undefined || null) || post.Titulo.length < 1) {
                return {
                    Erros: [{
                            Campo: 'Criar post',
                            Mensagem: 'Titulo invalido'
                        }]
                };
            }
            yield em.fork().persistAndFlush(post);
            return {
                Post: post
            };
        });
    }
    EditarPost(id, Titulo, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield em.fork().findOne(PostEntidade_1.Post, { id });
            if (!post) {
                return {
                    Erros: [{
                            Campo: 'Editar post',
                            Mensagem: 'Post nao encontrado'
                        }]
                };
            }
            if (!(post.Titulo === (undefined || null) || post.Titulo.length < 1)) {
                post.Titulo = Titulo;
                yield em.fork().persistAndFlush(post);
            }
            return {
                Post: post
            };
        });
    }
    DeletarPost(id, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield em.fork().findOne(PostEntidade_1.Post, { id });
            if (!post) {
                return {
                    Erros: [{
                            Campo: 'Deletar post',
                            Mensagem: 'Usuario nao encontrado',
                        }]
                };
            }
            yield em.fork().nativeDelete(PostEntidade_1.Post, { id });
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [PostEntidade_1.Post]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "EncontrarTodosPosts", null);
__decorate([
    (0, type_graphql_1.Query)(() => Respostas_1.RespostaPost, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "EncontrarPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Respostas_1.RespostaPost),
    __param(0, (0, type_graphql_1.Arg)('Titulo')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "CriarPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Respostas_1.RespostaPost, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('Titulo', () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "EditarPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Respostas_1.RespostaPost),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "DeletarPost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=PostResolver.js.map