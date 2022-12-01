import { Request, Response } from "express";
import { connection } from "../data/connection";

export const registerUser = async ( req: Request, res: Response ): Promise<void> => {
    let errorCode = 400

    try {
        const { name, email, password } = req.body

        if (!name) {
            errorCode = 422
            throw new Error(
                `Por favor insira todos os parâmetros corretamente. 
                Parâmetro 'name' não foi informado ou está incorreto!`
            )
        }

        if (!email) {
            errorCode = 422
            throw new Error(
                `Por favor insira todos os parâmetros corretamente. 
                Parâmetro 'email' não foi informado ou está incorreto!`
            )
        }

        if (!password) {
            errorCode = 422
            throw new Error(
                `Por favor insira todos os parâmetros corretamente. 
                Parâmetro 'password' não foi informado ou está incorreto!`
            )
        }

        if (typeof name !== "string") {
            errorCode = 422
            throw new Error("O parâmetro 'name' deve ser do tipo string!")
        }

        if (typeof email !== "string") {
            errorCode = 422
            throw new Error("O parâmetro 'email' deve ser do tipo string!")
        }

        if (typeof password !== "string") {
            errorCode = 422
            throw new Error("O parâmetro 'password' deve ser do tipo string!")
        }

        const result = await connection.raw(`
            SELECT email FROM labecommerce_users 
            WHERE email LIKE "%${email}"
        `)

        const registeredEmail = result[0]
        
        if (registeredEmail.length > 0) {
            errorCode = 409
            throw new Error("Já existe um usuário cadastrado com o email informado!")
        }

        await connection.raw(`
            INSERT INTO labecommerce_users (id, name, email, password)
            VALUES(
                "${Date.now().toString()}", 
                "${name}", 
                "${email}", 
                "${password}" 
            );
        `)

        res.status(201).send("Novo usuário cadastrado com sucesso!")

    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
}