const Todo = require("./server/models/Todo.model");

module.exports = exportToExcel = async () => {
  var excel = require("excel4node");

  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet("Sheet 1");
  // var worksheet2 = workbook.addWorksheet("Sheet 2");

  // Create a reusable style
  var styleTitle = workbook.createStyle({
    font: {
      color: "#FF0800",
      size: 12,
      weight: 500
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });
  var styleTask = workbook.createStyle({
    font: {
      color: "#000000",
      size: 12,
    }
  })

  var tasks = [];

  const promise = new Promise((resolve, reject) => {
    Todo.find({}).exec((err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  worksheet.cell(1, 1).string("Tasks").style(styleTitle);
  worksheet.cell(1, 2).string("State").style(styleTitle);

  await promise
    .then((result) => {
      tasks = result;
      console.log(result);
      for (let i = 2; i < result.length + 2; i++) {
        worksheet.cell(i, 1).string(result[i-2].name).style(styleTask);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // // Set value of cell A1 to 100 as a number type styled with paramaters of style
  // worksheet.cell(1, 1).number(100).style(style);

  // // Set value of cell B1 to 300 as a number type styled with paramaters of style
  // worksheet.cell(1, 2).number(200).style(style);

  // // Set value of cell C1 to a formula styled with paramaters of style
  // worksheet.cell(1, 3).formula("A1 + B1").style(style);

  // // Set value of cell A2 to 'string' styled with paramaters of style
  // // worksheet.cell(2, 1).string('string').style(style);

  // // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  // worksheet
  //   .cell(3, 1)
  //   .bool(true)
  //   .style(style)
  //   .style({ font: { size: 14 } });

  workbook.write("Excel.xlsx");
};
