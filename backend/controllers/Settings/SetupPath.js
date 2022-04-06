const Model = require("../../model/Settings/PathModel");
const asynHandler = require("../../middleware/async");
const ErrorResponse = require("../../utls/errorResponse");
exports.CreatePath = asynHandler(async (req, res, next) => {
  const { src_swift_docs_path_print, src_swift_docs_path_pdf, src_swift_docs_path_img, src_swift_docs_path_txt} =
    req.body;

  /**
   ** Check Duplicate Path
   **/
  const Path = {
    src_swift_docs_path_print,
    src_swift_docs_path_pdf,
    src_swift_docs_path_img,
    src_swift_docs_path_txt,
  };
  let results = await Model.all();

  if (results.length < 1) {
    const client = await Model.create(Path);
    if (client.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `Record Successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Sorry we could not register this new Path, please try again",
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: `You have an existing Path In The System`,
  });
});

exports.GetPath = asynHandler(async (req, res, next) => {
    let results = await Model.all();
    if (results.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Sorry, Failed To Retrieve Data",
        Data: []
      });
    }
    res.json({
      Status: 1,
      Message: "Record Found",
      Data: results,
    });
});

exports.updatePath = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide id`,
    });
  }
  const { src_swift_docs_path_print, src_swift_docs_path_pdf, src_swift_docs_path_img, src_swift_docs_path_txt} =
  req.body;
  const newData = {
    src_swift_docs_path_print,
    src_swift_docs_path_pdf,
    src_swift_docs_path_img,
    src_swift_docs_path_txt,
  };
  let result = await Model.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      success: true,
      message: `Record Updated`,
    });
  } else {
    res.status(401).json({ success: false, message: "Error Updating Record" });
  }
});

exports.SinglePath = asynHandler(async (req, res, next) => {
    let id = req.body.id;
    if (!id) {
        return res.status(400).json({
          Status: 0,
          Message: `Please provide id`,
        });
      }
    let dbresult = await Model.find(id);
    if (!dbresult) {
      return res.status(200).json({
        Status: 0,
        Data: [],
        Message: `No record found`,
      });
    }
  
    res.json({
      Status: 1,
      Message: "Record Found",
      Data: dbresult,
    });
  });