import { Router } from "express";
import { commentController } from "../controller/commentController";

const commentRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Comment API
 */

/**
 * @swagger
 * paths:
 *   /comments/comment:
 *     post:
 *       tags: [Comment]
 *       summary: create new comment
 *       requestBody:
 *         description: creat new comment
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 boardId:
 *                   type: string
 *                 content:
 *                   type: string
 *     responses:
 *       201:
 *         description: 새 댓글 생성 성공!!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */
commentRouter.post("/comments/comment", commentController.addComment);

/**
 * @swagger
 * paths:
 *   /comments/recomment:
 *     post:
 *       tags: [Comment]
 *       summary: create new recomment
 *       requestBody:
 *         description: target -> 대댓글을 달 댓글 정보
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 target:
 *                   $ref: '#/components/schemas/Comment'
 *                 content:
 *                   type: string
 *     responses:
 *       201:
 *         description: 새 대댓글 생성 성공!!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */
commentRouter.post("/comments/recomment", commentController.addReComment);

/**
 * @swagger
 * paths:
 *  /comments/{commentId}:
 *    get:
 *      tags: [Comment]
 *      summary: find comment by commentId
 *      parameters:
 *        - name: commentId
 *          in: path
 *          type: integer
 *          description: comment의 고유 id
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  payload:
 *                    $ref: '#/components/schemas/Comment'
 */
commentRouter.get("/comments/:commentId", commentController.getComment);

/**
 * @swagger
 * paths:
 *  /comments/{boardId}:
 *    get:
 *      tags: [Comment]
 *      summary: find commentlist by boardId
 *      parameters:
 *        - name: boardId
 *          in: path
 *          type: string
 *          description: board의 고유 id
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  payload:
 *                    $ref: '#/components/schemas/Comment'
 */
commentRouter.get("/commentlist/:boardId", commentController.getCommentList);

/**
 * @swagger
 * paths:
 *   /comments/{commentId}:
 *     put:
 *       tags: [Comment]
 *       summary: update comment
 *       parameters:
 *         - name: commentId
 *           in: path
 *           type: integer
 *           description: comment의 고유 id
 *       requestBody:
 *         description: update comment content
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *       responses:
 *         200:
 *           description: succ
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 */
commentRouter.put("/comments/:commentId", commentController.setComment);

/**
 * @swagger
 * paths:
 *   /comments/{commentId}:
 *     delete:
 *       tags: [Comment]
 *       summary: delete comment
 *       parameters:
 *         - name: commentId
 *           in: path
 *           type: integer
 *           description: comment의 고유 id
 *       responses:
 *         200:
 *           description: succ
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 */
commentRouter.delete("/comments/:commentId", commentController.deleteComment);

export { commentRouter };
