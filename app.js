const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', taskRoutes);
app.use(errorMiddleware.handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
