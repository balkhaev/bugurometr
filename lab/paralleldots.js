require("dotenv").config({ path: __dirname + "/../.env" });

const pd = require("paralleldots");

pd.apiKey = process.env.PARALLELDOTS_API_KEY;

pd.emotion("Уебищный день, уебищный ты!", "ru")
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
