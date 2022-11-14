import { body, param } from 'express-validator';

export const validId = param('id').isString().isLength({ min: 24, max: 24 });

export const validRating = body('rating').isNumeric().isLength({ min: 0, max: 9 });

export const validTag = body('tag').isString().isLength({ min: 1, max: 64 });
