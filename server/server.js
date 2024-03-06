const app =  require("./app/index.js");

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {console.log(`Server running on Port ${PORT} \n`)});