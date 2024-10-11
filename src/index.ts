import express,{Request,Response} from 'express'
import cors from 'cors'
import connection from './connection';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/usuarios", async (req, res) => {
    try {
    const resultado = await connection.raw(`
        SELECT * FROM USERS;
    `)
        res.status(201).send(resultado[0])
    
    } catch (error) {
        console.log(error);
        res.status(500).send("An unexpected error occurred")
    }
})

app.post("/usuarios/mudarNome", async (req:Request,res:Response)=>{
    const {nome} = req.query;
    const user  = req.body;

    if(!nome){
        res.send("nome invalido")
    }
    if(!user){
        res.send("campo faltando");
    }

    try{
        await connection("users")
            .update({name:user.name})
            .where({name:nome})
        
        res.send('deu certo')

    }catch (error){
        console.log(error);
    }
})
    
   

app.listen(3003,()=>{
    console.log("Vamos rodar")
})
