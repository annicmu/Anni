
let pool = require('../util/dbUtil');
let $sql = require('./commentSqlMapping');

module.exports = {
  queryByAnniId: async (anniId) => {
    try {
      const comments = await pool.query($sql.queryByAnniId, +anniId);
      let commentsWithReplies = [];
      for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        if (comment.parentId === 0) {
          commentsWithReplies.push(comment);
        }
      }
      for (let i = 0; i < commentsWithReplies.length; i++) {
        const comment = commentsWithReplies[i];
        comment.replies = [];
        for (let i = 0; i < comments.length; i++) {
          const reply = comments[i];
          if (reply.parentId === comment.id) {
            comment.replies.push(reply);
          }
        }
      }
      console.log('queryByAnniId', commentsWithReplies);
      return commentsWithReplies;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  queryByUserId: async (userId) => {
    try {
      const comments = await pool.query($sql.queryByUserId, +userId);
      return comments;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  add: async (content, parentId, userId, anniId) => {
    try {
      const ret = await pool.query($sql.insert, [content, parentId, userId, anniId]);
      console.log('add', ret);
      return ret;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  update: async (content, commentId) => {
    try {
      const ret = await pool.query($sql.update, [content, commentId]);
      console.log('update', ret);
      return ret;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  delete: async (id) => {
    try {
      const ret = await pool.query($sql.delete, +id);
      console.log('delete', ret);
      return ret;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  addLike: async (id, userId) => {
    try {
      const ret = await pool.query($sql.insertLike, [id, userId]);
      console.log('addLike', ret);
      return ret;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  deleteLike: async (id) => {
    try {
      const ret = await pool.query($sql.deleteLike, +id);
      console.log('deleteLike', ret);
      return ret;
    } catch(err) {
      console.log(err);
      return err;
    }
  },
  queryLike: async (id) => {
    try {
      const ret = await pool.query($sql.queryLike, +id);
      console.log('queryLike', ret);
      return ret;
    } catch(err) {
      console.log(err);
      return err;
    }
  }
};
