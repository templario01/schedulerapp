import app from './app';

const PORT = app.get('port')

function main() {
  app.listen(PORT);
  console.log(`Server on port http://localhost:${PORT}`);
}

main();
