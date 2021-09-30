const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname,'test-pages')));

console.log('PAATH',path.resolve(__dirname,'test-pages'));

const port = process.env.SERVER_PORT;
app.listen(port, () => {
	console.log(`Local server listening at http://localhost:${port}`);
});
