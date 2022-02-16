import 'dotenv/config'
import app from './App/App'

app.listen(process.env.PORT, () => console.log(`Server running at port ${process.env.PORT}`))
