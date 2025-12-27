import express from 'express';
import { PORT } from './env.js';
import cors from 'cors';

import patientRouter from './routes/patients.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/patients', patientRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;