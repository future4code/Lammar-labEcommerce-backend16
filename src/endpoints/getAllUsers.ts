import { Request, Response } from "express";
import { connection } from "../data/connection";

export const getAllUsers = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        const result = await connection.raw(`
            SELECT * FROM labecommerce_users; 
        `)

        const allUsers = result[0]
        
        if (allUsers.length < 1) {
            errorCode = 500
            throw new Error("Erro inesperado no servidor. Requisição indisponível no momento!")
        }

        res.status(200).send(allUsers)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}