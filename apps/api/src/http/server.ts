import { env } from "@saas/env"
import app from "./app"

app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}, (err, address) => {
    if (err) {
        console.error('Failed to run HTTP server', err)
        process.exit(1)
    }

    console.log(`HTTP server running on ${address}`)
})