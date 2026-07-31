import express, { type Request, type Response } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(Number(PORT), () => {
  console.log(`[server]: Server is runing at http://localhost:${PORT}`);
});

app.get('/ready', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'trả về dữ liệu thành công',
      timeStamp: new Date().toDateString(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      timeStamp: new Date().toDateString(),
    });
    console.log('500: /ready.get: ' + err);
  }
});

app.get('/health', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'trả về dữ liệu thành công',
      timeStamp: new Date().toDateString(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      timeStamp: new Date().toDateString(),
    });
    console.log('500: /health.get: ' + err);
  }
});
