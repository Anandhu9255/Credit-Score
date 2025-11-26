import { Router } from 'express';
import { getCreditScore, getScoreHistory } from '../controllers/score.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/score:
 *   get:
 *     summary: Get credit score for logged-in user
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current credit score
 */
router.get('/', protect, getCreditScore);

/**
 * @swagger
 * /api/score/history:
 *   get:
 *     summary: Get credit score history
 *     tags: [Score]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns credit score history
 */
router.get('/history', protect, getScoreHistory);

export default router;
