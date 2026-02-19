import ky from "ky"
import { getCookie } from "cookies-next"

export const api = ky.create({
    prefixUrl: 'http://localhost:3333/api'
})