"use strict";
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
exports.Migration20220730202708 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220730202708 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('create table "usuario" ("id" serial primary key, "criado_em" timestamptz(0) not null, "atualizado_em" timestamptz(0) not null, "nome_de_usuario" text not null, "password" text not null);');
            this.addSql('alter table "usuario" add constraint "usuario_nome_de_usuario_unique" unique ("nome_de_usuario");');
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('drop table if exists "usuario" cascade;');
        });
    }
}
exports.Migration20220730202708 = Migration20220730202708;
//# sourceMappingURL=Migration20220730202708.js.map