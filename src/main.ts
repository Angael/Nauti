import router from './routes/router.js';

const PORT = process.env.PORT || 4000;
router.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
