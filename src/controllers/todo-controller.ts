import { Request, Response } from 'express';
import { Todo } from '../database/models/todo-model';

export const getTodoList = async (req, res) => {
    const todos = await Todo.findAll();

    return res.status(200).json(todos);
}

export const createTodo = async (req: Request, res: Response) => {
    const newTodo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority
    });

    return res.json({ message: 'Todo created successfully!', data: newTodo})
}

export const updateTodo = async (req: Request, res: Response) => {
    const todo: any = await Todo.findByPk(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found!' })
    }

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.priority = req.body.priority;
    todo.status = req.body.status;

    await todo.save();

    return res.json({ message: 'Todo updated successfully!', data: todo })
}

export const deleteTodo = async (req: Request, res: Response) => {
    const todo: any = await Todo.findByPk(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found!' })
    }

    await todo.destroy();

    return res.json({ message: 'Todo deleted successfully!', data: todo })
}
