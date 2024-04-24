import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createQuestion = async (req: any, res: any) => {
    const question = await prisma.question.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.id
        }
    })
    res.send({ question })
    console.log(question);
}

export const updateQuestion = async (req: any, res: any) => {
    console.log(req.params);
    const id = req.params.id;
    let updateData: any = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.content) updateData.content = req.body.content;
    try {
        const updatedQuestion = await prisma.question.update({
            where: {
                id: id,
                authorId: req.user.id
            },
            data: updateData
        })
        res.json({ data: updatedQuestion });
    } catch (error) {
        res.status(404).json({ error: `Question with ${id} not found. Update Failed!` });
    }
}

export const deleteQuestion = async (req: any, res: any) => { 
    const id = req.params.id;
    const deletedQuestion = await prisma.question.findFirst({
        where: {
            id: id,
            authorId: req.user.id
        }
    })
    if (!deletedQuestion) {
        res.status(404).json({ error: `Question with id: ${id} not found` });
    }
    else {
        await prisma.question.delete({
            where: {
                id: id
            }
        })
        res.json({ data: deletedQuestion });
    }
}

export const getQuestionById = async (req: any, res: any) => {
    const id = req.params.id;
    const question = await prisma.question.findFirst({
        where: {
            id: id,
            authorId: req.user.id
        }
    })
    if (!question) {
        res.status(404).json({ error: `Product with id: ${id} not found` });
    }
    else res.json({ data: question });
}

export const getQuestions = async (req: any, res: any) => {
    const questions = await prisma.question.findMany();
    console.log(questions);
    
    res.send(questions);
}

export const likeQuestion = async (req: any, res: any) => {
    //console.log(req.params);
    const id = req.params.questionId;
    try {
        const updatedQuestion = await prisma.question.update({
            where: {
                id: id,
            },
            data: {
                likes: { increment: 1 }
            }
        })
        res.json({ data: updatedQuestion });
    } catch (error) {
        res.status(404).json({ error: `Question with ${id} not found. Update Failed!` });
    }
}

export const dislikeQuestion = async (req: any, res: any) => {
    //console.log(req.params);
    const id = req.params.questionId;
    try {
        const updatedQuestion = await prisma.question.update({
            where: {
                id: id,
            },
            data: {
                likes: { decrement: 1 }
            }
        })
        res.json({ data: updatedQuestion });
    } catch (error) {
        res.status(404).json({ error: `Question with ${id} not found. Update Failed!` });
    }
}