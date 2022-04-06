const Model = require("../../model/Messages/Mtype");
const asynHandler = require("../../middleware/async");

exports.CreateMessage = asynHandler(async (req, res, next) => {
  let table = req.body.tableName;
  let createdBy = req.body.createdBy;
  console.log(req.body);
  if (!table) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide Table Name`,
    });
  }

  const record = {
    message_type: `m${table}`,
    createdBy,
  };
  let dbresult = await Model.CreateMessage(`m${table}`);
  if (dbresult.results) {
    let recordResult = await Model.msgRecord(record);
    if (recordResult.affectedRows === 1) {
      res.json({
        Status: 1,
        result: recordResult,
        Message: `Record Created Successfully`,
      });
    } else {
      res.status(500).json({
        Status: 0,
        Message: "Error Saving Message Table Record",
        extra: "Record not Saved",
      });
    }
  } else {
    res.status(500).json({
      Status: 0,
      Message: "Error Saving Message Table",
      extra: "Table Record not Saved",
    });
  }
});

exports.CreateHeaders = asynHandler(async (req, res, next) => {
  const { isdefault, version, jsondata, createdBy } = req.body;
  let msgtype = req.body.messagetype;
  let messagetype = `m${msgtype}`;
  if (!messagetype) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide Message Type`,
    });
  }

  let getmsgType = await Model.MessageTypeRecords(messagetype);
  if (!getmsgType) {
    return res.status(400).json({
      Status: 0,
      Message: `Message Table Does Not Exist`,
    });
  }

  const headerData = {
    messagetype,
    isdefault,
    version,
    jsondata: JSON.stringify(jsondata),
    createdBy,
  };
  let dbresult = await Model.msgHeaders(headerData);
  if (dbresult.affectedRows) {
    res.json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({
      Status: 0,
      Message: "Error Saving Record",
    });
  }
});

exports.SaveMessage = asynHandler(async (req, res, next) => {
  const { docname, dir, sender, reciever, jsondata, cdatetime } = req.body;
  let msgtype = req.body.messagetype;
  let messagetype = `m${msgtype}`;
  if (!messagetype) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide Message Type Name`,
    });
  }

  let getmsgType = await Model.MessageTypeRecords(messagetype);
  if (!getmsgType) {
    return res.status(400).json({
      Status: 0,
      Message: `Message Type Does Not Exist`,
    });
  }

  const msgData = {
    docname,
    dir,
    sender,
    reciever,
    jsondata: JSON.stringify(jsondata),
    cdatetime,
  };
  let dbresult = await Model.DynamicMsg(messagetype, msgData);
  if (dbresult.affectedRows) {
    res.json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({
      Status: 0,
      Message: "Error Saving Record",
    });
  }
});

exports.GetMessages = asynHandler(async (req, res, next) => {
  let msgtype = req.body.messagetype;
  let messagetype = `m${msgtype}`;
  if (!messagetype) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide Message Type`,
    });
  }

  let getmsgType = await Model.MessageTypeRecords(messagetype);
  if (!getmsgType) {
    return res.status(400).json({
      Status: 0,
      Message: `Message Type Does Not Exist`,
    });
  }

  let dbresult = await Model.GetMessages(messagetype);
  let headerResult = await Model.GetHeaders(messagetype);

  if (dbresult.length == 0) {
    return res.status(200).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
      Data: [],
    });
  }
  res.json({
    Status: 1,
    Message: "Record Found",
    Data: dbresult,
    headerData: JSON.parse(headerResult.jsondata),
  });
});
