import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";

export type Contexto = {
    em: EntityManager<IDatabaseDriver<Connection>>
    req: Request
    res: Response
}