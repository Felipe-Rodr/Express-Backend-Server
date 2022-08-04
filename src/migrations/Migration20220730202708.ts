import { Migration } from '@mikro-orm/migrations';

export class Migration20220730202708 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "usuario" ("id" serial primary key, "criado_em" timestamptz(0) not null, "atualizado_em" timestamptz(0) not null, "nome_de_usuario" text not null, "password" text not null);');
    this.addSql('alter table "usuario" add constraint "usuario_nome_de_usuario_unique" unique ("nome_de_usuario");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "usuario" cascade;');
  }

}
