import { Field, ObjectType } from "type-graphql";
import { Post } from "../Entidades/PostEntidade";
import { Usuario } from "../Entidades/UsuarioEntidade";

@ObjectType()
export class ErroEmCampo {
    @Field()
    Campo?: string;
    @Field()
    Mensagem?:string;
}

@ObjectType()
export class RespostaPost {
    @Field(() => [ErroEmCampo], {nullable:true})
    Erros?: ErroEmCampo[];

    @Field(() => Post, {nullable:true})
    Post?: Post;
}

@ObjectType()
export class RespostaUsuario {
    @Field(() => [ErroEmCampo], {nullable:true})
    Erros?: ErroEmCampo[];

    @Field(() => Usuario, {nullable:true})
    Usuario?: Usuario;
}