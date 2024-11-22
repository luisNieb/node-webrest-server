import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UdateTodoDto } from "../../domain/dtos";

interface Product {
  id: number;
  text: string;
  createAt: Date | null;
}


export class TodosController {
  //*
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const data = await prisma.todo.findMany()
    res.json(data);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) throw res.status(400).json({ error: "Invalid parameter" });

   // const todo = todos.find((todo) => todo.id === id);
    const todo = await prisma.todo.findFirst({ where: {id: id} });
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: `TODO with id ${id} not found` });
    }
  };

  public createTodo= async(req: Request, res: Response)=>{

    const [error, createTodoDto]= CreateTodoDto.create(req.body)

    if (error) throw res.status(400).json({ error: "text property is required" });


    const todo = await prisma.todo.create({
      data:createTodoDto
    })

    res.json(todo);
  }

  public updateTodo= async(req: Request, res: Response) =>{
    const id = +req.params.id;
    
    const [error ,udateTodoDto]= UdateTodoDto.create({...req.body, id})
        if(error)  throw res.status(400).json({error})

    try {
      const todo= await prisma.todo.findFirst({where:{id: id}});
    
      if (!todo) throw res.status(404).json({ error: "TODO not found" });
         
    
      const updateTodo = await prisma.todo.update({
           where: {id: id},
           data: udateTodoDto!.values
      } );
      
      res.json(updateTodo);
      
    } catch (error) {
         throw res.status(400).json({error})
    }

  }

  public deleteTodo= async (req: Request, res: Response)=>{
      const id = +req.params.id;

       const deleteTodo= await prisma.todo.delete({where: {id:id}
       })

       if(!deleteTodo) throw res.status(404).json({error: "Not Found"});

      if(isNaN(id)) throw res.status(400).json({ error: "invalid id" });
      
     // const todo = todos.filter(todo => todo.id !== id)
     // todos.splice(todos.indexOf(idReq),1)
      
       
      res.json(deleteTodo);
  }
}
