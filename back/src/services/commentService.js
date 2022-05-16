import { commentModel } from "../db/models/comment/comment";
import { addError, findError } from "../utils/errorMessages";

class commentService {
  static async addComment({ boardId, userId, content }) {
    if (!boardId || !userId || !content) {
      const errorMessage = addError("댓글");
      throw new Error(errorMessage);
    }
    const order = 0;
    const depth = 0;
    const newComment = { order, depth, boardId, userId, content };
    const insertedComment = await commentModel.insertComment({ newComment });

    const commentId = insertedComment.null;
    const fieldToUpdate = "parentCommentId";
    const newValue = commentId;

    const insertedParentId = await commentModel.update({
      commentId,
      fieldToUpdate,
      newValue,
    });

    return insertedParentId;
  }

  static async addReComment({ target, userId, content }) {
    if (!target || !userId || !content) {
      const errorMessage = addError("댓글");
      throw new Error(errorMessage);
    }
    const parentCommentId = target.parentCommentId;
    const order = target.order + 1;

    const orderRange = order;
    await commentModel.incrementOrder({ parentCommentId, orderRange });

    const depth = target.depth + 1;
    const boardId = target.boardId;
    const newComment = {
      parentCommentId,
      order,
      depth,
      boardId,
      userId,
      content,
    };
    const insertedReComment = await commentModel.insertComment({ newComment });

    return insertedReComment;
  }

  static async getComment({ commentId }) {
    const comment = await commentModel.findByCommentId({ commentId });
    if (!comment) {
      const errorMessage = findError("댓글");
      throw new Error(errorMessage);
    }
    return comment;
  }

  static async getCommentList({ boardId }) {
    const commentList = await commentModel.findByBoardId({ boardId });
    return commentList;
  }

  static async setComment({ commentId, toUpdate }) {
    let comment = await commentModel.findByCommentId({ commentId });
    if (!comment) {
      const errorMessage = findError("게시판");
      throw new Error(errorMessage);
    }

    if (toUpdate.parentCommentId) {
      const fieldToUpdate = "parentCommentId";
      const newValue = toUpdate.parentCommentId;
      comment = await commentModel.update({
        commentId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.content) {
      const fieldToUpdate = "content";
      const newValue = toUpdate.content;
      comment = await commentModel.update({
        commentId,
        fieldToUpdate,
        newValue,
      });
    }

    return comment;
  }

  static async deleteComment({ commentId }) {
    const deletedResult = await commentModel.deleteByCommentId({ commentId });
    if (!deletedResult) {
      const errorMessage = findError("게시판");
      throw new Error(errorMessage);
    }

    return deletedResult;
  }
}

export { commentService };
