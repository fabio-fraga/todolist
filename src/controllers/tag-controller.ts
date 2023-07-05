import { Request, Response } from 'express';
import { Tag } from '../database/models/tag-model';

export const getTagList: any = async (req: Request, res: Response) => {
    const tags: any = await Tag.findAll();

    if (tags.length === 0) {
        return res.status(404).json({ error: 'Tags not found!' });
    }

    return res.status(200).json(tags);
}

export const createTag: any = async (req: Request, res: Response) => {
    const tag: any = await Tag.findOne({ where: { name: req.body.name } });

    if (tag) {
        if (tag.name.toUpperCase() === req.body.name.toUpperCase()) {
            return res.status(400).json({ error: 'Tag already exists!' });
        }
    }
    
    const newTag = await Tag.create({
        name: req.body.name,
        color: req.body.color,
    });

    return res.status(201).json({ success: 'Tag created successfully!', CreatedData: newTag});
}

export const updateTag: any = async (req: Request, res: Response) => {
    const tag: any = await Tag.findByPk(req.params.id);

    if (!tag) {
        return res.status(404).json({ error: 'Tag not found!' })
    }

    tag.name = req.body.name;
    tag.color = req.body.color;

    await tag.save();

    return res.status(204).json({ success: 'Tag updated successfully!', UpdatedData: tag });
}

export const deleteTag: any = async (req: Request, res: Response) => {
    const tag: any = await Tag.findByPk(req.params.id);

    if (!tag) {
        return res.status(404).json({ error: 'Tag not found!' });
    }

    await tag.destroy();

    return res.status(204).json({ success: 'Tag deleted successfully!', deletedData: tag });
}
