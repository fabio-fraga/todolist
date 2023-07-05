import { Request, Response } from 'express';

const { Todo, Tag } = require('../database/models');

export const getTodoList = async (req, res) => {
    const todos = await Todo.findAll(
        {
            include: [
                {
                    model: Tag,
                    as: 'tags',
                    through: {
                        attributes: []
                    }
                }
            ]
        }
    );

    if (todos.length === 0) {
        return res.status(404).json({ error: 'Todos not found!' });
    }

    return res.status(200).json(todos);
}

export const createTodo = async (req: Request, res: Response) => {
    const { tags, ...data } = req.body;

    const todo: any = await Todo.findOne({ where: { title: data.title } });
    
    if (todo) {
        return res.status(400).json({ message: 'Todo already exists!' });
    }

    const newTodo = await Todo.create(data);

    if (tags && tags.length > 0) {
        await newTodo.setTags(tags);
    } else {
        return res.status(400).json({ message: 'You must select at least one tag!' });
    }

    return res.status(201).json({ message: 'Todo created successfully!', data: newTodo });
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

    return res.status(200).json({ message: 'Todo updated successfully!', data: todo })
}

export const deleteTodo = async (req: Request, res: Response) => {
    const todo: any = await Todo.findByPk(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found!' })
    }

    await todo.destroy();

    return res.status(200).json({ message: 'Todo deleted successfully!', data: todo })
}
