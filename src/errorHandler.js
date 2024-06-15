const createError = require('http-errors');

function errorHandler(err, req, res, next) {
  // Логуємо помилку для налагодження (це може знадобитись в залежності від потреб проекту)
  console.error(err);

  // Якщо помилка не має визначеного статусу, встановлюємо 500 (Internal Server Error)
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  const data = err.data || null;

  // Відправляємо відповідь з визначеним статусом та об'єктом помилки
  res.status(status).json({ status, message, data });
}

module.exports = errorHandler;
