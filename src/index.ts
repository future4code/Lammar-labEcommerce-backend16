import { app } from "./app";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getAllUsers } from "./endpoints/getAllUsers";
import { registerProduct } from "./endpoints/registerProduct";
import { registerUser } from "./endpoints/registerUser";

app.get("/users", getAllUsers)

app.get("/products", getAllProducts)

app.post("/users", registerUser)

app.post("/products", registerProduct)
