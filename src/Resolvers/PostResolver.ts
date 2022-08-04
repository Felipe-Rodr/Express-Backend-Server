import { Resolver,Query, Ctx, Arg, Mutation} from "type-graphql";
import { Post } from "../Entidades/PostEntidade";
import { Contexto } from "src/Contexto";
import { RespostaPost } from "./Respostas";


@Resolver()
export class PostResolver{
    @Query(() => [Post])
    EncontrarTodosPosts(
        @Ctx() {em}:Contexto
    ):Promise<Post[]>{
        return em.fork().find(Post, {});
    }

    @Query(() => RespostaPost, {nullable:true})
    async EncontrarPost(
        @Arg('id') id:number, 
        @Ctx() {em}:Contexto
    ):Promise<RespostaPost | null>{
        const post = await em.fork().findOne(Post, {id});
        if(!post){
            return {
                Erros: [{
                    Campo:'Encontrar post',
                    Mensagem: 'Post nao encontrado'
                }]
            };
        }
        return {
            Post:post
        };
    }

    @Mutation(() => RespostaPost)
    async CriarPost(
        @Arg('Titulo') Titulo:string,
        @Ctx() {em}:Contexto
    ):Promise<RespostaPost | null>{
        const post = em.fork().create(Post, 
            {   
                Titulo:Titulo
            });
        if(post.Titulo === (undefined || null) || post.Titulo.length < 1){
            return {
                Erros:[{
                    Campo:'Criar post',
                    Mensagem:'Titulo invalido'
                }]
            };
        }
        await em.fork().persistAndFlush(post);
        return {
            Post:post
        };
    }

    @Mutation(() => RespostaPost, {nullable:true})
    async EditarPost(
        @Arg('id') id:number,
        @Arg('Titulo', () => String, {nullable: true}) Titulo:string,
        @Ctx() {em}:Contexto
    ):Promise<RespostaPost | null>{
        const post =  await em.fork().findOne(Post, {id});
        if(!post){
            return {
                Erros:[{
                    Campo:'Editar post',
                    Mensagem:'Post nao encontrado'
                }]
            }
        }
        if(!(post.Titulo === (undefined || null) || post.Titulo.length < 1)){
            post.Titulo = Titulo;
            await em.fork().persistAndFlush(post);
        }
        return {
            Post:post
        };
    }

    @Mutation(() => RespostaPost)
    async DeletarPost(
        @Arg('id') id:number,
        @Ctx() {em}:Contexto
    ):Promise<RespostaPost | boolean>{
        const post = await em.fork().findOne(Post,{id});
        if(!post){
            return {
                Erros: [{
                    Campo:'Deletar post',
                    Mensagem:'Usuario nao encontrado',
                }]
            }
        }
        await em.fork().nativeDelete(Post, {id});
        return true;
    }
}