import { Migration } from '@mikro-orm/migrations';

export class Migration20220730211326 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "usuario" rename column "password" to "senha";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "usuario" rename column "senha" to "password";');
  }

}
