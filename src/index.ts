import { app } from "./app";
import { getAllUsers } from "./endpoints/getAllUsers";
import { registerProduct } from "./endpoints/registerProduct";
import { registerUser } from "./endpoints/registerUser";

app.get("/users", getAllUsers)

app.post("/users", registerUser)

app.post("/products", registerProduct)