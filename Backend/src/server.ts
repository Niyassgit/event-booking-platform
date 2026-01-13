import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT,()=>{
    console.log(`server is running on the port : http://localhost:${env.PORT}`);
})
