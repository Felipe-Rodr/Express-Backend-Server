import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
    [OptionalProps]?: 'CriadoEm' | 'AtualizadoEm';

    @Field()
    @PrimaryKey()
    id!: number;

    @Field(() => Date)
    @Property({type: 'date'})
    CriadoEm =  new Date();

    @Field(() => Date)
    @Property({type: 'date', onUpdate: () => new Date()})
    AtualizadoEm =  new Date();

    @Field()
    @Property({type: 'text'})
    Titulo!: string;
}
