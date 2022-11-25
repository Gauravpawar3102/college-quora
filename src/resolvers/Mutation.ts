import { Post, Prisma } from '.prisma/client';
import { Context } from '../index';
interface PostArgs {
  post: { title?: string; content?: string };
}
interface PostPayLoadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}
export const Mutation = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayLoadType> => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: 'You must provide a title and content to create a post',
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: prisma.post.create({
        data: { title, content, authorId: 1 },
      }),
    };
  },
  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostArgs['post'] },
    { prisma }: Context
  ): Promise<PostPayLoadType> => {
    const { title, content } = post;
    if (!title && !content) {
      return {
        userErrors: [
          {
            message: 'need to have atleast one field to update',
          },
        ],
        post: null,
      };
    }
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!existingPost) {
      return {
        userErrors: [
          {
            message: 'post does not exist',
          },
        ],
        post: null,
      };
    }
    let payloadToUpdate = {
      title,
      content,
    };
    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;

    return {
      userErrors: [],
      post: prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(postId),
        },
      }),
    };
  },
};
