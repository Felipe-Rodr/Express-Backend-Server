export {};

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            DATABASE: string
            USERDB: string
            PASSWORD: string
            ENV: 'test' | 'dev' | 'prod'
        }
    }
}