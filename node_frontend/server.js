const express = require('express')

const app = express()

app.get('/', (req,res) => res.send('API Running'))

app.use('/viewaccess',require('./routes/api/get_details'))
app.use('/api/honeytoken', require('./routes/api/honeytoken'))



const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

