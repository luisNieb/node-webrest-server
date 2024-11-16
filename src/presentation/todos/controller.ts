import { Request, Response } from "express";

interface Product {
  id: number;
  text: string;
  createAt: Date | null;
}

 const todos: Product[] = [
  { id: 1, text: "buy milk", createAt: new Date() },
  { id: 2, text: "buy milk", createAt: null },
  { id: 3, text: "buy milk", createAt: null },
  { id: 4, text: "buy milk", createAt: null },
  { id: 5, text: "buy milk", createAt: null },
];

export class TodosController {
  //*
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response): void => {
    const id = +req.params.id;

    if (isNaN(id)) throw res.status(400).json({ error: "Invalid parameter" });

    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: `TODO with id ${id} not found` });
    }
  };

  public createTodo(req: Request, res: Response): void {
    if (!req.body.text)
      throw res.status(400).json({ error: "text property is required" });

    const newTodo: Product = {
      id: todos.length + 1,
      text: req.body.text,
      createAt: new Date()
    };

    todos.push(newTodo);

    res.json(newTodo);
  }

  public updateTodo(req: Request, res: Response) {
    const id = +req.params.id;
    if (isNaN(id)) throw res.status(400).json({ error: "Invalid parameter" });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) throw res.status(404).json({ error: "TODO not found" });

    const { text, createAt } = req.body;

    if (!text)
      throw res.status(400).json({ error: "Text propperty is required" });

    todo.text = text || todo.text;
    createAt === "null"
      ? (todo.createAt = null)
      : (todo.createAt = new Date(createAt || todo.createAt));

    res.json(todo);
  }

  public deleteTodo(req: Request, res: Response){
      const id = +req.params.id;
       const idReq= todos.find(todo => todo.id === id)
       console.log(idReq)

       if(!idReq) throw res.status(404).json({error: "Not Found"});

      if(isNaN(id)) throw res.status(400).json({ error: "invalid id" });
      
      const todo = todos.filter(todo => todo.id !== id)
      todos.splice(todos.indexOf(idReq),1)
      
       
      res.json(idReq);
  }
}
