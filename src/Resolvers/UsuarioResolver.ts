import { Resolver,Query, Ctx, Arg, Mutation} from "type-graphql";
import { Usuario } from "../Entidades/UsuarioEntidade";
import { Contexto } from "src/Contexto";
import argon2 from 'argon2';
import { RespostaUsuario } from "./Respostas";

@Resolver()
export class UsuarioResolver {
    @Query(() => [Usuario])
    EncontrarTodosUsuarios(
        @Ctx() {em}:Contexto
    ):Promise<Usuario[]>{
        return em.fork().find(Usuario, {});
    }

    @Query(() => RespostaUsuario, {nullable:true})
    async EncontrarUsuario(
        @Arg('id') id:number, 
        @Ctx() {em}:Contexto
    ):Promise<RespostaUsuario | null>{
        const usuario = await em.fork().findOne(Usuario, {id});
        if(!usuario){
            return {
                Erros: [{
                    Campo:'Encontrar usuario',
                    Mensagem: 'Usuario nao encontrado'
                }]
            };
        }
        return {
            Usuario:usuario
        };
    }

    @Mutation(() => RespostaUsuario)
    async RegistrarUsuario(
        @Arg('NomeDeUsuario') NomeDeUsuario:string,
        @Arg('Senha') Senha:string,
        @Ctx() {em}:Contexto
    ):Promise<RespostaUsuario | null>{
        const HashSenha = await argon2.hash(Senha)
        const usuario = em.fork().create(Usuario, {
            NomeDeUsuario:NomeDeUsuario,
            Senha:HashSenha
        });
        if(usuario.NomeDeUsuario === (undefined || null) || usuario.NomeDeUsuario.length < 2){
            return {
                Erros: [{
                    Campo:'Registrar usuario',
                    Mensagem: 'Nome de usuario inválido (Minimo 2 caracteres)'
                }]
            }
        } else if(Senha === (undefined || null) || Senha.length < 4){
            return {
                Erros: [{
                    Campo:'Registrar usuario',
                    Mensagem: 'Senha inválida (Minimo 4 caracteres)'
                }]
            }
        }
        try{
            await em.fork().persistAndFlush(usuario);
        } catch(Erro) {
            if(Erro.code === '23505'){
                return {
                    Erros:[{
                        Campo:'Registrar usuario',
                        Mensagem:'Nome de usuario ja existe'
                    }]
                }
            }
        }  
        return {
            Usuario:usuario
        };
    }

    @Query(() => Usuario, {nullable: true})
    async GetSessionUsuario(
        @Ctx() {req, em}: Contexto
    ):Promise<Usuario | null>{
        if(!req.session.userId){
            return null;
        }
        const usuario = await em.fork().findOne(Usuario, {id:req.session.userId});
        return usuario;
    }


    @Mutation(() => RespostaUsuario)
    async LoginUsuario(
        @Arg('NomeDeUsuario') NomeDeUsuario:string,
        @Arg('Senha') Senha:string,
        @Ctx() {em,req}:Contexto
    ):Promise<RespostaUsuario | null>{
        const usuario = await em.fork().findOne(Usuario,{NomeDeUsuario});
        if(!usuario){
            return {
                Erros: [{
                    Campo:'Login usuario',
                    Mensagem:'Usuario nao encontrado',
                }]
            }
        }
        const LoginValido = await argon2.verify(usuario.Senha,Senha);
        if(!LoginValido){
            return {
                Erros: [{
                    Campo:'Login usuario',
                    Mensagem:'Senha Invalida',
                }]
            }
        }
        req.session.userId = usuario.id;
        return {
            Usuario:usuario
        }
    }

    @Mutation(() => RespostaUsuario, {nullable:true})
    async EditarUsuario(
        @Arg('id') id:number,
        @Arg('NomeDeUsuario', () => String, {nullable: true}) NomeDeUsuario:string,
        @Ctx() {em}:Contexto
    ):Promise<RespostaUsuario | null>{
        const usuario =  await em.fork().findOne(Usuario, {id});
        if(!usuario){
            return {
                Erros: [{
                    Campo:'Editar usuario',
                    Mensagem:'Usuario nao encontrado',
                }]
            }
        }
        if(!(usuario.NomeDeUsuario === (undefined || null) || usuario.NomeDeUsuario.length < 2)){
            usuario.NomeDeUsuario = NomeDeUsuario;
            await em.fork().persistAndFlush(usuario);
        }
        return {
            Usuario:usuario
        };
    }

    @Mutation(() => RespostaUsuario)
    async DeletarUsuario(
        @Arg('id') id:number,
        @Ctx() {em}:Contexto
    ):Promise<RespostaUsuario>{
        const usuario = await em.fork().findOne(Usuario,{id});
        if(!usuario){
            return {
                Erros: [{
                    Campo:'Deletar usuario',
                    Mensagem:'Usuario nao encontrado',
                }]
            }
        }
        await em.fork().nativeDelete(Usuario, {id});
        return {
            Usuario:usuario
        };
    }
}