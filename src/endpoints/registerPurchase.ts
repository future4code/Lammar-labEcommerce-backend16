import { Request, Response } from "express";
import { connection } from "../data/connection";

export const registerPurchase = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        const { user_id, product_id, quantity } = req.body

        if (!user_id) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'user_id' não foi informado ou está incorreto!`
            )
        }

        if (!product_id) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'product_id' não foi informado ou está incorreto!`
            )
        }

        if (!quantity) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'quantity' não foi informado ou está incorreto!`
            )
        }

        if (typeof user_id !== "string") {
            errorCode = 422
            throw new Error("O valor do parâmetro 'user_id' deve ser do tipo string!")
        }

        if (typeof product_id !== "string") {
            errorCode = 422
            throw new Error("O valor do parâmetro 'product_id' deve ser do tipo string!")
        }

        if (typeof quantity !== "number") {
            errorCode = 422
            throw new Error("O valor do parâmetro 'quantity' deve ser do tipo number!")
        }

        if (quantity < 1) {
            errorCode = 422
            throw new Error("O valor do parâmetro 'quantity' deve ser maior ou igual a 1!")
        }

        const resultProduct = await connection.raw(`
            SELECT * FROM labecommerce_products
            WHERE id = "${product_id}";
        `)

        const registeredProduct = resultProduct[0]

        if (registeredProduct.length < 1) {
            errorCode = 422
            throw new Error(
                `Nenhum produto foi encontrado no banco de dados, referente ao id informado.
                Verifique se o valor informado no parâmetro 'product_id' está correto!`
            )
        }

        const resultUser = await connection.raw(`
            SELECT * FROM labecommerce_users
            WHERE id = "${user_id}";
        `)

        const registeredUser = resultUser[0]
        
        if (registeredUser.length < 1) {
            errorCode = 422
            throw new Error(
                `Nenhum usuário foi encontrado no banco de dados, referente ao id informado.
                Verifique se o valor informado no parâmetro 'user_id' está correto!`
            )
        }
        
        const nameUser = resultUser[0][0].name
        const nameProduct = resultProduct[0][0].name
        const priceProduct = resultProduct[0][0].price
        const totalPrice = priceProduct * quantity

        await connection.raw(`
            INSERT INTO labecommerce_purchases (id, user_id, product_id, quantity, total_price)
            VALUES(
                "${Date.now().toString()}", 
                "${user_id}", 
                "${product_id}", 
                ${quantity},
                ${totalPrice} 
            );
        `)

        res.status(201).send(
            `Compra realizada com sucesso! ${nameUser} comprou ${quantity} "${nameProduct}",
            no valor de R$ ${priceProduct}. Valor Total da compra: R$ ${totalPrice}.`
        )

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}