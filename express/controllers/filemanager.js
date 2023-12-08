
class FileManagerController {
  constructor(fileService) {
    this._fileService = fileService;

  }

  addNewDoc = async (req,res) => {
    console.log(req.files['file'][0])

    // console.log('files_controller');
    this._fileService.addNewDoc();
    res.send('123');
  }

}


module.exports = FileManagerController;