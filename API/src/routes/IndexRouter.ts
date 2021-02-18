import {Router} from "express"
import { InvRouter } from "./inventory/controller"
import { MapRouter } from "./map/controller"
import {Validator} from "./middleware"
import { MonsterRouter } from "./monster/controller"
import {UserRouter} from "./user/controller"

const router = Router()

router.use('/', Validator)
router.use('/user', UserRouter)
router.use('/map', MapRouter)
router.use('/monster', MonsterRouter)
router.use('/inventory', InvRouter)

export {router as IndexRouter}