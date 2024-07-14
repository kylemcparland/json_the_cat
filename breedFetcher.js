const needle = require("needle");
const breed = process.argv[2];

needle.get(("https://api.thecatapi.com/v1/breeds/search?q=" + breed), function (error, response) {
  // Check if error:
  if (error) {
    // Check if URL is correct:
    if (error.code === "ENOTFOUND") {
      console.log("Incorrect URL.");
      return;
    } else {
      // Return generic error otherwise:
      console.log(error);
      return;
    }
  }
  
  // Check if breed exists in repo
  if (response.body.length === 0) {
    console.log("Breed not found.");
    return;
  }

  // Otherwise, return description:
  console.log(response.body[0].description);
});



// needle("get", ("https://api.thecatapi.com/v1/breeds/search?q=" + breed))
//   .then((response) => {
//     if (response.body[0]) {
//       console.log(response.body[0].description);
//     } else {
//       throw new Error("Breed not found.");
//     }
//   })
//   .catch((error) => {
//     if (error.code === "ENOTFOUND") {
//       console.log("Invalid URL");
//     } else if (error.message === "Breed not found.") {
//       console.log("Breed not found.");
//     } else {
//       console.log(error);
//     }
//   });