let axios = require("axios");
const suid = require("rand-token").suid;
const unix = Math.round(+new Date() / 1000);
const User = require("../models/user");
const { BaseUrl } = require("../helpers/vars");

const noteCtrl = {};

noteCtrl.showLogin = async (req, res) => {
  res.render("notes/signin", {});
};

noteCtrl.signoutUser = async (req, res) => {
  console.log("logoutInitaited");
  try {
    await axios.post(
      `${BaseUrl}/users/logout`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (req.session.user) {
      req.session.user_id = "";
      req.session.user = "";
      req.session.phone = "";
      req.session.email = "";
      req.session.username = "";
      req.session.role = "";
      return res.redirect("/signin");
    } else {
      req.flash("error_msg", "Sorry, you do not have access");
      return res.redirect("/signin");
    }
  } catch (error) {
    // res.send(error.response.data);
    // req.flash("error_msg", error.response.data.Message);
    return res.redirect("/");
    // console.log(error.response.data);
  }
};

noteCtrl.signinUser = async (req, res) => {
  const { username, password } = req.body;
  // console.log("login controller hit"); //still cant hear u...im speaking....
  try {
    let { data } = await axios.post(
      `${BaseUrl}/users/auth`,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // console.log(data);

    if (data && data.Status == 1) {
      req.session.user_id = data.Data.idsys_users;
      req.session.user = data.Data.fullname;
      req.session.phone = data.Data.phone;
      req.session.email = data.Data.email;
      req.session.username = data.Data.username;
      req.session.role = data.Data.role;

      // console.log(data);
    } else {
      req.flash("error_msg", "Sorry, you do not have access");
      return res.redirect("/signin");
    }

    res.json(data);
    // console.log(data);
  } catch (error) {
    res.send(error.response.data);
    req.flash("error_msg", error.response.data.Message);
    return res.redirect("/");
    // console.log(error.response.data);
  }
};

noteCtrl.renderNotes = async (req, res) => {
  res.render("dashboard/index", {
    pagename: "Dashboard",
    icon: "feather icon-home",
    layout: "main.hbs",
  });
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.showCompany = async (req, res) => {
  let { data } = await axios.post(
    `${BaseUrl}/settings/getcompany` //make all the routes like this
  );

  res.render("settings/company", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data,
    pagename: "company",
    layout: "main.hbs",
  });
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.updateCompany = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  const {
    id,
    comp_name,
    comp_email,
    address,
    comp_url,
    comp_slogan,
    comp_logo_name,
    comp_logo_type,
  } = req.body;

  // console.log(comp_logo_name);
  // console.log(comp_logo_type);

  try {
    let { data } = await axios.post(
      `${BaseUrl}/settings/updatecompany`,

      {
        id,
        comp_name,
        comp_email,
        comp_url,
        comp_slogan,
        comp_logo_name,
        comp_logo_type,
        address,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.showAuthentication = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/getoath"
  );

  let data1 = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/getldap"
  );

  // console.log(data);
  // console.log(data1);

  res.render("settings/auth", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data,
    list1: data1.data,
    pagename: "authentication",
    layout: "main.hbs",
  });
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.updateOauth = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  const { id, url, apikey, secret, redirect_uri, enabled } = req.body;

  // console.log(id, "COMPANY_ID");

  try {
    let { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/updateoath",

      {
        id,
        url,
        apikey,
        secret,
        redirect_uri,
        enabled,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.updateLdap = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  const { id, ldap_url, ldap_user, ldap_password, ldap_domain, enabled } =
    req.body;

  // console.log(id, "COMPANY_ID");

  try {
    let { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/updateldap",

      {
        id,
        ldap_url,
        ldap_user,
        ldap_password,
        ldap_domain,
        enabled,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.showPaths = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/allpaths"
  );
  // console.log(data.Data);
  res.render("settings/paths", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data.Data,
    pagename: "paths/directories",
    layout: "main.hbs",
  });
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.showPath = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";
  const { id } = req.params;
  let processId = parseInt(id);

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/singlepaths",
    { id: processId }
  );

  const data1 = [data.Data];

  res.render("settings/path", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data1,
    pagename: "path/directory",
    layout: "main.hbs",
  });
};

noteCtrl.addPath = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  // const uuid = suid(16);
  // const finaluuid = uuid + unix;
  const {
    src_swift_docs_path_print,
    src_swift_docs_path_pdf,
    src_swift_docs_path_img,
    src_swift_docs_path_txt,
  } = req.body;

  // console.log(req.body);

  try {
    const { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/createpath",
      {
        src_swift_docs_path_print,
        src_swift_docs_path_pdf,
        src_swift_docs_path_img,
        src_swift_docs_path_txt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.updatePath = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  const {
    id,
    src_swift_docs_path_print,
    src_swift_docs_path_pdf,
    src_swift_docs_path_img,
    src_swift_docs_path_txt,
  } = req.body;

  // console.log(id, "COMPANY_ID");

  try {
    let { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/updatepath",

      {
        id,
        src_swift_docs_path_print,
        src_swift_docs_path_pdf,
        src_swift_docs_path_img,
        src_swift_docs_path_txt,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.showSmsgateways = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/allsmsgateway"
  );
  // console.log(data);
  res.render("smsgateway/smsgateways", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data.Data,
    pagename: "Sms Gateways",
    layout: "main.hbs",
  });
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.showSmsgateway = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";
  const { id } = req.params;
  let processId = parseInt(id);

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/findsmsgateway",
    { id: processId }
  );
  // console.log(data);
  const data1 = [data.Data];

  res.render("smsgateway/smsgateway", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data1,
    pagename: "Sms Gateway",
    layout: "main.hbs",
  });

  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.addSmsgateway = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  // const uuid = suid(16);
  // const finaluuid = uuid + unix;
  const { gateway, gatewayurl, gatewaykeys, gatewaypassword, balance } =
    req.body;

  // console.log(req.body);

  try {
    const { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/createsmsgateway",
      {
        gateway,
        gatewayurl,
        gatewaykeys,
        gatewaypassword,
        balance,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.updateSmsgateway = async (req, res) => {
  const {
    id,
    gateway,
    gatewayurl,
    gatewaykeys,
    gatewaypassword,
    balance,
    status,
  } = req.body;

  try {
    const { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/updatesmsgateway",
      {
        id,
        gateway,
        gatewayurl,
        gatewaykeys,
        gatewaypassword,
        balance,
        status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
};

noteCtrl.showNotification = async (req, res) => {
  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/getsmtp"
  );

  // console.log(data);

  res.render("settings/notification", {
    list: data,
    pagename: "notification",
    layout: "main.hbs",
  });
};

noteCtrl.updateNotification = async (req, res) => {
  const {
    id,
    smtpHost,
    smtpPort,
    smtpTLS,
    smtpUser,
    smtpPass,
    smtpFrom,
    enabled,
  } = req.body;

  try {
    let { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/updatesmtp",

      {
        id,
        smtpHost,
        smtpPort,
        smtpTLS,
        smtpUser,
        smtpPass,
        smtpFrom,
        enabled,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
};

noteCtrl.addUser = async (req, res) => {
  const { fullname, username, phone, email, password } = req.body;

  // console.log(req.body);

  try {
    const { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/users/create",
      {
        fullname,
        username,
        phone,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
};

noteCtrl.showUsers = async (req, res) => {
  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/users/fetchallusers"
  );

  res.render("users/users", {
    list: data,
    pagename: "users",
    layout: "main.hbs",
  });
};

noteCtrl.showMyDetail = async (req, res) => {
  console.log(req.session);
  const data = [req.session];
  res.render("users/mydetail", {
    list: data,
    pagename: "profile",
    layout: "main.hbs",
  });
};

noteCtrl.showUserDetail = async (req, res) => {
  const { email } = req.params;

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/users/find",
    { email: email }
  );
  console.log(data);

  res.render("users/userdetail", {
    list: data.Data,
    pagename: "profile",
    layout: "main.hbs",
  });
};

noteCtrl.showAddAlertProfiles = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";
  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/allprofile"
  );

  // console.log(data);

  res.render("alertprofile/profiles", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data.Data,
    pagename: "alert/profiles",
    layout: "main.hbs",
  });
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.showAddAlertProfileDetail = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";
  const { email } = req.params;

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/settings/singleprofile",
    { id: email }
  );

  const data1 = [data.Data];

  res.render("alertprofile/profiledetail", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data1,
    pagename: "alert/profile detail",
    layout: "main.hbs",
  });
};

noteCtrl.addAlert = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  // const uuid = suid(16);
  // const finaluuid = uuid + unix;
  const {
    CustomerName,
    email,
    sms,
    account_number,
    idMsgType,
    idFlow,
    message_template,
    internal_alert_email,
    idalert_type,
    status,
  } = req.body;

  try {
    const { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/createprofile",
      {
        CustomerName,
        email,
        sms,
        account_number,
        idMsgType,
        idFlow,
        message_template,
        internal_alert_email,
        idalert_type,
        status,
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
  // } else {
  //   res.redirect("/login");
  // }
};

noteCtrl.updateAlert = async (req, res) => {
  // if (req.session.user && req.cookies.user_sid) {
  //   hbsContent.loggedin = true;
  //   hbsContent.userName = req.session.user.username;
  //   //console.log(JSON.stringify(req.session.user));

  //   hbsContent.title = "You are logged in";

  const {
    id,
    CustomerName,
    email,
    sms,
    account_number,
    idMsgType,
    idFlow,
    message_template,
    internal_alert_email,
    idalert_type,
    status,
  } = req.body;

  try {
    const { data } = await axios.post(
      "http://localhost:7000/swiftapp/v1/settings/updateprofile",
      {
        id,
        CustomerName,
        email,
        sms,
        account_number,
        idMsgType,
        idFlow,
        message_template,
        internal_alert_email,
        idalert_type,
        status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.send(error.response.data);
  }
};

noteCtrl.showSwiftMessages = async (req, res) => {
  res.render("messages/messages", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },

    pagename: "SWIFT/message-Types",
    layout: "main.hbs",
  });
};

noteCtrl.showSwiftMessageList = async (req, res) => {
  const { msg } = req.params;
  let table = parseInt(msg);
  // console.log(msg);
  // console.log(req.session);

  let { data } = await axios.post(
    "http://localhost:7000/swiftapp/v1/msg/getmessages",
    { messagetype: table }
  );

  const dddd = JSON.parse(data.Data[0].jsondata);

  console.log(dddd);
  // console.log(JSON.parse(data.Data[0].jsondata.data));
  let sliced;
  let datarecord = [];
  let jdata = JSON.parse(data.Data[0].jsondata);
  jdata.data.map((book) => {
    sliced = Object.keys(book)
      .slice(1, 11)
      .reduce((result, key) => {
        result[key] = book[key];

        return result;
      }, {});
    datarecord.push(sliced);
  });
  // console.log(sliced)

  // console.log(datarecord)

  // console.log(data.headerData.headers)
  const datafield = data.headerData.headers[0];
  const datafield1 = data.headerData.headers;
  // const data1 = jdata.data
  console.log(datafield);

  const datafield2 = datafield1.map((a) => {
    return a.data;
  });

  var newArray = new Array();
  datafield2.forEach(function (item) {
    newArray.push({ data: item });
  });

  // let obj = {}
  // datafield2.forEach((item) => {
  //   // obj[item] = "data"
  //   obj[item] = item
  // })

  console.log(newArray);

  // const newArray1 = JSON.stringify(newArray)

  // console.log(newArray1)

  // const combineObjects = (arr) => {
  //   return arr.reduce((acc, o) => {
  //     return { ...o, ...acc }
  //   }, {})
  // }
  // console.log(combineObjects(datafield2))

  // const lloog = JSON.parse(datafield2)

  // const datafield5 = newArray.map((a) => {
  //   return Object.keys(a)
  // })

  // console.log(datafield2)
  // console.log(datafield5)

  const array = JSON.parse(data.Data[0].jsondata);
  const tdata = array.data;
  // const result = art.filter((val) => {
  //   // console.log(val)
  //   return datafield1.find((a) => {
  //     // console.log(a)
  //     return val === a.data
  //   })
  // })

  const reducedFilter = (data, keys, fn) =>
    data.filter(fn).map((el) =>
      keys.reduce((acc, key) => {
        acc[key] = el[key];
        return acc;
      }, {})
    );

  const fgh = reducedFilter(tdata, datafield2, (item) => item);

  console.log(fgh);

  // const result = fgh.map((d) =>
  //   Object.fromEntries(
  //     Object.entries(d).map(
  //       (
  //         // [k, v]) => ["data", v]))
  //         [k, v]
  //       ) => [obj[k] || k, v]
  //     )
  //   )
  // )

  // console.log(result)

  // let obj = {}
  // datafield2.forEach((item) => {
  //   // obj[item] = "data"
  //   obj[item] = "Data"
  // })

  // let obj = { first_name: "f_name", last_name: "l_name", home: "address" }

  // let mapped = fgh.map((person) => {
  //   // start with a basic template of the result object you want
  //   let template = { ...obj }
  //   // now fill in the proper values for each key
  //   Object.entries(template).forEach(([key, value]) => {
  //     template[key] = person[value]
  //     // Object.keys("data")
  //   })
  //   return template
  // })

  // console.log(mapped)

  let list3 = fgh.map((item) => {
    return { data: Object.values(item) };
  });

  console.log(list3);

  // const combineObjects = (arr) => {
  // return arr.reduce((acc, o) => {
  //   return { ...o, ...acc }
  // }, {})
  // }
  // console.log(combineObjects(fgh))

  // console.log(result)

  res.render("messages/messagelist", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },
    list: data.headerData.headers,
    list1: list3,
    field: datafield,
    pagename: "SWIFT/messages",
    layout: "main.hbs",
  });
};

noteCtrl.showSwiftMessagePreview = async (req, res) => {
  res.render("messages/messagedetail", {
    // hbsContent: {
    //   loggedin: true,
    //   userName: req.session.user.username,
    //   title: "You are logged in",
    // },

    pagename: "SWIFT/Message-Preview",
    layout: "main.hbs",
  });
};

module.exports = noteCtrl;
//im looking for login routes---- i did it in the server.js
