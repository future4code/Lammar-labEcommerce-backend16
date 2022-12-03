import { Request, Response } from "express";
import { connection } from "../data/connection";

export const getAllProducts = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        let order = req.query.order as string
        let search = req.query.search as string
        
        if (!order || order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC") {
            order = "ASC"
        }

        if (!search) {
            search = "%"
        }

        const result = await connection.raw(`
            SELECT * FROM labecommerce_products
            WHERE name LIKE "%${search}%" 
            ORDER BY name ${order};
        `)

        const allProducts = result[0]

        if (allProducts.length < 1) {
            errorCode = 404
            throw new Error("Produto não encontrado no banco de dados.")
        }

        res.status(200).send(allProducts)

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}