const path = require("path");
var fs = require("fs-extra");
const CompanyModel = require("../../model/Settings/CompanySettings");
const asynHandler = require("../../middleware/async");
const ErrorResponse = require("../../utls/errorResponse");
exports.CreateCompany = asynHandler(async (req, res, next) => {
  const { comp_name, comp_logo, comp_slogan, comp_email, comp_url, address } =
    req.body;

  //check files for
  if (req.files === null) {
    return next(new ErrorResponse(`Please include a  file`, 400));
  }
  const file = req.files.comp_logo;
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //change filename
  file.name = `comp_logo${path.parse(file.name).ext}`;
  file.mv(`./uploads/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 400));
    }
  });

  /**
   ** Check Duplicate Email
   **/
  const Company = {
    comp_name,
    comp_logo: file.name,
    comp_slogan,
    comp_email,
    comp_url,
    address,
  };
  let results = await CompanyModel.all();

  if (results.length < 1) {
    const client = await CompanyModel.SetupCompany(Company);
    if (client.affectedRows === 1) {
      return res.status(200).json({
        success: true,
        message: `Great, You Created a Company Successfully`,
      });
    } else {
      res.status(401).json({
        success: false,
        message:
          "Sorry we could not register this new company, please try again",
      });
    }
  }

  return res.status(400).json({
    success: false,
    message: `You have an  existing Comapny In The System`,
  });
});

exports.GetCompany = asynHandler(async (req, res, next) => {
  let results = await CompanyModel.all();
  if (results.length == 0) {
    return res.status(401).json({
      success: false,
      message: "Sorry, Failed To Retrieve Data",
    });
  }
  res.json(results);
});

exports.updateCompany = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  // console.log(req.body);

  const photo = {
    originalname: req.body.comp_logo_name,
    mimetype: req.body.comp_logo_type,
  };
  // post image upload
  // const multerConfig = {
  //   storage: multer.diskStorage({
  //     // Setup where the file will go
  //     destination: function (req, file, next) {
  //       console.log("hit destination");
  //       next(null, "./public/photo-storage");
  //     },

  //     // Give the file a unique name
  //     filename: function (req, file, next) {
  //       console.log("file", file);
  //       console.log("originalname", file.originalname);
  //       const ext = file.mimetype.split("/")[1];
  //       next(null, file.originalname);
  //     },
  //   }),

  //   // check if its an image
  //   fileFilter: function (req, file, next) {
  //     if (!file) {
  //       next();
  //     }

  //     const image = file.mimetype.startsWith("image/");
  //     if (image) {
  //       console.log("photo uploaded");
  //       next(null, true);
  //     } else {
  //       console.log("file not supported");

  //       return next();
  //     }
  //   },
  // };

  //check files for
  // const file = req.files.comp_logo;
  // let file = { mv: path };
  // console.log(file.mv());
  if (!req.body.comp_logo_type.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  //change filename
  req.body.comp_logo_name = `comp_logo${
    path.parse(req.body.comp_logo_name).ext
  }`;
  fs.move(`${req.body.comp_logo_name}`, "/uploads", function (err) {
    if (err) return console.error(err);
    console.log("success!");
  });
  // fs.move(
  //   `./uploads/${req.body.comp_logo_name}`,
  //   "/tmp/does/not/exist/yet/somefile",
  //   async (err) => {
  //     if (err) {
  //       console.log(err);
  //       return next(new ErrorResponse(`Problem with file upload`, 400));
  //     }
  //   }
  // );

  // let multerData = multer(multerConfig).single(photo);
  // console.log(multerData);

  const newData = {
    comp_name: req.body.comp_name,
    comp_logo: req.body.comp_logo,
    comp_slogan: req.body.comp_slogan,
    comp_email: req.body.comp_email,
    comp_url: req.body.comp_url,
    address: req.body.address,
  };
  let result = await CompanyModel.UpdateCompany(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      success: true,
      message: `Record Updated`,
    });
  } else {
    res.status(401).json({ success: false, message: "Error Updating Record" });
  }
});
