import { User } from "../routes/user/response"

declare global {
    namespace Express {
        interface Request {
            User: User
        }
    }
}