import { Router } from "express";
import { createQuestion, deleteQuestion, getQuestionById, getQuestions, updateQuestion, likeQuestion } from "./handlers/question";
import { body, validationResult } from 'express-validator';

const router = Router();

/**
 * @route GET /question
 * @description Get all questions
 * @access Public
 * @returns {Question[]} - An array of question objects
 * @throws {500} - Server error
 * @example GET /question
 */
router.get('/questions', getQuestions)

/**
 * @route GET /question/:id
 * @description Get a question by id
 * @access Public
 * @returns {Question} - A question object
 * @throws {404} - If the question does not exist
 * @throws {500} - Server error
 * @example GET /question/1
 */
router.get('/question/:id', getQuestionById)

/**
 * @route POST /question
 * @description Create a new question
 * @access Private
 * @returns {Question} - A question object
 * @throws {500} - Server error
 * @example POST /question
 */
router.post('/question', body('title').trim().notEmpty().isString(),
    (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send(`Question name ${req.body.title} Validated. Successfully!`)
        }
        else {
            res.status(400)
            res.send({ errors: result.array() })
        }
        next()
    }, createQuestion)

/**
 * @route PUT /question/:id
 * @description Update a question by id
 * @access Private
 * @returns {Question} - A question object
 * @throws {404} - If the question does not exist
 * @throws {500} - Server error
 * @example PUT /question/1
 */
router.put('/question/:id', updateQuestion)

/**
 * @route DELETE /question/:id
 * @description Delete a question by id
 * @access Private
 * @returns {Question} - A question object
 * @throws {404} - If the question does not exist
 * @throws {500} - Server error
 * @example DELETE /question/1
 */
router.delete('/question/:id', deleteQuestion)

router.post('/question/:questionId/like', likeQuestion);
router.post('/question/:questionId/dislike', likeQuestion);
export default router;