const fsPromise = require('fs/promises')
const fs = require('fs')
const path = require('path');
const { Readable } = require('stream');
const process = require('../utils/fileSplit');

class FileManagerController {
  constructor(fileService) {
    this._fileService = fileService;

  }

  preProcess = async (req, res) => {
    res.header('Content-Type', 'application/json');
    const depart = req.query.depart;
    //獲取過濾後的POST資料
    const file = req.files['file'][0];
    const originFile = fs.readFileSync(file.path);
    const data = originFile.toString('utf-8');
    let jsonString;
    //原始資料進行格式化
    if (depart === 'RADIOLOGY') {
      jsonString = JSON.stringify(process(data, file.originalname), null, 2);
    } else {
      jsonString = JSON.stringify(data, null, 2);
    }

    //用stream方式進行讀寫
    const readableStream = new Readable({
      read() {
        this.push(jsonString);
        this.push(null);
      }
    });
    readableStream.pipe(fs.createWriteStream(file.path, 'utf-8'))
      .on('finish', () => {
        //結束後返回檔案參數
        res.send({ fileName: file.filename });
        console.log('Write operation complete using Stream.');
      })
      .on('error', (err) => {
        console.error('Error writing to Stream:', err);
      });


  }
  browseDocs = async (req, res) => {
    const result = await this._fileService.browse();
    res.status(result.status).send(result);
  }


  addNewDoc = async (req, res) => {
    const { file } = req;
    const split = file.buffer.toString('utf-8').split('$');
    const reports = JSON.parse(split[0]);
    const privateInfo = JSON.parse(split[1]);
    const result = this._fileService.upload(reports, privateInfo);

    res.status(200).send(result.data);
  }


  deleteDisk = async (req, res) => {
    res.header('Content-Type', 'plain/text');
    const { params } = req;

    if (params.id == 'all') {
      const folderPath = path.join(__dirname, '../temp/uploads/');
      try {
        const files = await fsPromise.readdir(folderPath);
        if (files.length === 0) {
          res.status(200).send('Folder is empty.');
          return
        }
        const deleteFilePromises = files.map(file =>
          fsPromise.unlink(path.join(folderPath, file)),
        );
        await Promise.allSettled(deleteFilePromises);
        console.log('Folder deleted successfully.');
        res.status(200).send('Folder deleted successfully.');
        return;
      } catch (error) {
        console.error('Error deleting folder:', err);
        res.status(500).send('Error deleting folder');
        return;
      }
    }

    res.send('123')
  }
}


module.exports = FileManagerController;