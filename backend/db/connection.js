const mysql = require('mysql');

const con = mysql.createConnection({ 
host: "localhost", 
port: 3306, 
database: "reactmysql", 
user: "root", 
password: "" 
});

con.connect(function (err) {
   if(err){
       console.log("error occurred while connecting");
   }
   else{
      // console.log("connection created successfully");
   }
}); 

module.exports = con