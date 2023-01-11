import { Request, Response } from "express";
import { connection } from "../data/connection";

export const registerProduct = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        const { name, price, image_url } = req.body

        if (price <= 0) {
            errorCode = 422
            throw new Error("O valor do parâmetro 'price' deve ser maior que zero!")
        }

        if (!name) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'name' não foi informado ou está incorreto!`
            )
        }

        if (!price) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'price' não foi informado ou está incorreto!`
            )
        }

        if (!image_url) {
            errorCode = 422
            throw new Error(
                `Por favor, insira todos os parâmetros corretamente. 
                Parâmetro 'image_url' não foi informado ou está incorreto!`
            )
        }

        if (typeof name !== "string") {
            errorCode = 422
            throw new Error("O valor do parâmetro 'name' deve ser do tipo string!")
        }

        if (typeof price !== "number") {
            errorCode = 422
            throw new Error("O valor do parâmetro 'price' deve ser do tipo number!")
        }

        if (typeof image_url !== "string") {
            errorCode = 422
            throw new Error("O valor do parâmetro 'image_url' deve ser do tipo string!")
        }

        const result = await connection.raw(`
            SELECT * FROM labecommerce_products 
            WHERE name LIKE "%${name}" OR image_url LIKE "%${image_url}";
        `)

        const registeredProduct = result[0]

        if (registeredProduct.length > 0) {
            errorCode = 409
            throw new Error("Este produto já foi cadastrado!")
        }

        await connection.raw(`
            INSERT INTO labecommerce_products (id, name, price, image_url)
            VALUES(
                "${Date.now().toString()}", 
                "${name}", 
                ${price}, 
                "${image_url}" 
            );
        `)

        res.status(201).send("Novo produto cadastrado com sucesso!")

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}