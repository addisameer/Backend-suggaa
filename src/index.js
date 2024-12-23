import dotenv from "dotenv"
dotenv.config();

import { connectDb } from "./db/index.js"
import  app  from "./app.js"

//Db connection
const port = process.env.PORT||8000
connectDb()
.then(() => {
app.listen(port , () => {
    console.log(`Server is listening on the port ${port} `);
})

})
.catch((err) => {
    console.error("Db connection failed while calling" , err)
})