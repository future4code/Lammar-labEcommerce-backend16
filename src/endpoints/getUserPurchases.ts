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
        
        if (registeredUser.length < 1) {
            errorCode = 422
            throw new Error(
                `Nenhum usuário foi encontrado no banco de dados, referente ao id informado.
                Verifique se o valor informado no parâmetro 'user_id' está correto!`
            )
        }

        const resultPurchases = await connection.raw(`
            SELECT * FROM  labecommerce_purchases
            WHERE user_id = "${userId}";
        `)

        const userPurchases= resultPurchases[0]

        if (userPurchases.length < 1) {
            res.status(200).send("Este usuário ainda não fez nenhuma compra!")
        } else{
            res.status(200).send(userPurchases)
        }
       
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}