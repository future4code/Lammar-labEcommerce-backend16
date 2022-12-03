import { Request, Response } from "express";
import { connection } from "../data/connection";

export const getUserPurchases = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        const userId = req.params.user_id

        const resultUser = await connection.raw(`
            SELECT * FROM labecommerce_users
            WHERE id = "${userId}";
        `)

        const registeredUser = resultUser[0]
        
        if (registeredUser.length <= 0) {
            errorCode = 401
            throw new Error(
                `O valor do parâmetro não foi informado corretamente ou é inválido!
                Nenhum usuário encontrado no banco de dados, referente ao id informado.
                Verifique o dado passado e informe-o corretamente!`
            )
        }

        const result = await connection.raw(`
            SELECT * FROM  labecommerce_purchases
            WHERE user_id = "${userId}";
        `)

        const userPurchases= result[0]

        if (userPurchases.length <= 0) {
            res.status(200).send("Este usuário ainda não fez nenhuma compra!")
        } else{
            res.status(200).send(userPurchases)
        }
       
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}