import { Router } from 'express';
import { addFinancialData, getFinancialData } from '../controllers/financial.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/financial:
 *   post:
 *     summary: Add financial data for user
 *     tags: [Financial]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               income:
 *                 type: number
 *               expenses:
 *                 type: number
 *     responses:
 *       201:
 *         description: Financial data added
 */
router.post('/', protect, addFinancialData);

/**
 * @swagger
 * /api/financial:
 *   get:
 *     summary: Get financial data for logged-in user
 *     tags: [Financial]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user financial data
 */
router.get('/', protect, getFinancialData);

export default router;
