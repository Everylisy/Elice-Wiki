import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

const getTagList = (tagString) => {
    // find 동작 시 post의 태그를 리스트로 변환
    const tagList = tagString.replaceAll("#", " ").trim().split(" ");
    return tagList;
};

const getPostInfo = (element) => {
    const { tag, ...postElement } = element;
    const tagList = getTagList(tag);
    return {
        ...postElement.dataValues,
        tag: tagList,
    };
};

const getPostList = (posts) => {
    const postListInfo = [];
    posts.forEach((element) => {
        postListInfo.push(getPostInfo(element));
    });
    return postListInfo;
};

class postModel {
    // post 추가
    static async insertPost({ newPost }) {
        const insertPost = await models.Post.create(newPost);
        if (!insertPost) {
            return {
                status: "failed",
                message: "게시글을 저장할 수 없습니다.",
            };
        }
        return {
            status: "succ",
            payload: insertPost,
        };
    }

    static async findAllPost() {
        const posts = await models.Post.findAll({
            attributes: [
                "title",
                "post_id",
                "date",
                "week",
                "user_id",
                "tag",
                "createdAt",
            ],
            order: [["createdAt", "DESC"]],
        });

        if (!posts) {
            return {
                status: "failed",
                message: "게시글이 없네요..",
            };
        }
        const postListInfo = getPostList(posts);
        return {
            status: "succ",
            payload: postListInfo,
        };
    }

    static async getPostByPostId({ post_id }) {
        // postId로 post의 정보검색
        // 사용자가 post를 눌렀을 때 동작?
        const getOnePost = await models.Post.findOne({
            where: { post_id },
            attributes: ["title", "post_id", "date", "week", "user_id", "tag"],
        });
        if (!getOnePost) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }

        return {
            status: "succ",
            payload: getOnePost,
        };
    }

    static async findByWeek({ week }) {
        // week를 기준으로 post 검색
        const postList = await models.Post.findAll({
            where: { week: week },
            attributes: ["title", "post_id", "date", "week", "user_id", "tag"],
            order: [["createdAt", "DESC"]],
        });
        if (!postList) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }
        const postListInfo = getPostList(postList);
        return {
            status: "succ",
            payload: postListInfo,
        };
    }

    static async findByTag({ tag }) {
        const posts = await models.Post.findAll({
            where: {
                tag: { [Op.substring]: tag },
            },
            order: [["createdAt", "DESC"]],
        });
        if (!posts) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }
        const postListInfo = getPostList(posts);

        return {
            status: "succ",
            payload: postListInfo,
        };
    }

    static async updatePost({ postId, update }) {
        const updatePostInfo = await models.Post.update(
            {
                // 바꿀 내용
                tag: update.tag,
                week: update.week,
                title: update.title,
            },
            {
                where: {
                    post_id: postId,
                },
            }
        );
        if (!updatePostInfo) {
            return {
                status: "failed",
                message: "조건에 알맞은 게시글이 없습니다",
            };
        }
        return {
            status: "succ",
            payload: updatePostInfo,
        };
    }
}

export { postModel };