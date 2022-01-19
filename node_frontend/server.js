const express = require('express')
const cors = require('cors')
const app = express()

app.get('/', (req,res) => res.send('API Running'))

app.use(cors())
app.use('/viewaccess',require('./routes/api/get_details'))
app.use('/api/honeytoken', require('./routes/api/honeytoken'))
app.use('/download/exe/',require('./routes/download_file'))
app.use('/mongo',require('./routes/api/testing_route'));
app.use('/api/database',require('./routes/api/database'));

const PORT = process.env.PORT || 5000 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

