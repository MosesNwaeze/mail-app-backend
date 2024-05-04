import express,{Express} from "express";
import cors from "cors";
import authRoute from "./routes/auth-route";
import messageRoute from "./routes/message-route";
import userRoute from "./routes/user-route";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/user', userRoute);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    import('./database/mongodb.config')
});