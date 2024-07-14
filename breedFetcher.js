const needle = require("needle");
const breed = process.argv[2];

needle("get", ("https://api.thecatapi.com/v1/breeds/search?q=" + breed))
  .then((response) => {
    if (response.body[0]) {
      console.log(response.body[0].description);
    } else {
      throw new Error("Breed not found.");
    }
  })
  .catch((error) => {
    if (error.code === "ENOTFOUND") {
      console.log("Invalid URL");
    } else if (error.message === "Breed not found.") {
      console.log("Breed not found.");
    } else {
      console.log(error);
    }
  });