import { Router } from 'express';
import { applyLoan, getLoanRecords } from '../controllers/loan.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/loan:
 *   post:
 *     summary: Apply for a loan
 *     tags: [Loan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               term:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loan applied successfully
 */
router.post('/', protect, applyLoan);

/**
 * @swagger
 * /api/loan:
 *   get:
 *     summary: Get user's loan records
 *     tags: [Loan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user's loan records
 */
router.get('/', protect, getLoanRecords);

export default router;
