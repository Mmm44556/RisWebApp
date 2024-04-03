const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 指定打包后的文件所在的目录
const staticFilesPath = path.join(__dirname, 'build');

// 使用 express.static 中间件来提供静态文件
app.use(express.static(staticFilesPath));

// 定义路由
app.get('/', (req, res) => {
  res.sendFile(path.join(staticFilesPath, 'index.html'));
});

// 启动 Express 服务器
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
