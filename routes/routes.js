const {Router} = require('express'); 
const router = Router();
const fs = require('fs');

const usersFile = fs.readFileSync("./users.json","utf8");
let users = JSON.parse(usersFile);

router.get("/",(req,res)=>{
    res.json("Bienvenido a mi API");
});

router.get("/users",(req,res)=>{
  res.status(200).json(users);
});

router.post("/users",(req,res)=>{
    
  const { nombre, apellido, correo, telefono} = req.body;

  if(!nombre || !apellido || !correo || !telefono ){
    res.status(401).json({error:"Por favor, diligencie todos los datos"});
  }else{

  const id = users.length + 1;


  let  newUser = {
    id,
    nombre,
    apellido,
    correo,
    telefono
  };

  users.push(newUser);
  const json_users = JSON.stringify(users);

  fs.writeFileSync("./users.json", json_users, "utf-8");

   res.status(200).json(users);

  }
});

router.put("/users/:id",(req,res)=>{

  const { nombre, apellido, correo, telefono}=  req.body;
  const id = req.params.id;
   
  if(!nombre || !apellido || !correo || !telefono || !id){
    res.status(401).json({error:"Debe completar los datos y especificar el id."});
  }else{
     
    users.filter((user)=>{

     if(user.id == id){
       user.nombre = nombre;
       user.apellido = apellido;
       user.correo = correo;
       user.telefono = telefono;
     }
    }); 

    const json_users = JSON.stringify(users);
    fs.writeFileSync("./users.json",json_users,"utf-8");

    res.status(200).json(users);


  }

  

});


router.delete("/users/:id",(req,res)=>{
    const id = req.params.id;

    if(!id){
      res.status(401).json({error: "Especifique un id"});
    }else{
      const indexUser = users.findIndex((user) => user.id === id);
      users.splice(indexUser,1);

      const json_users = JSON.stringify(users);
      fs.writeFileSync("./users.json", json_users,"utf-8");

      res.status(200).json(users);

     
    }

});



module.exports = router;