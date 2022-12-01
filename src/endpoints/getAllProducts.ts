import { Request, Response } from "express";
import { connection } from "../data/connection";

export const getAllProducts = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        const result = await connection.raw(`
            SELECT * FROM labecommerce_products 
        `)

        const allProducts = result[0]
        
        if (allProducts.length < 1) {
            errorCode = 500
            throw new Error("Erro inesperado no servidor. Requisição indisponível no momento!")
        }

        res.status(200).send(allProducts)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}