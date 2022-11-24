import { Post } from '.prisma/client';
import { Context } from '../index';
interface PostCreateArgs {
  title: string;
  content: string;
}
interface PostPayLoadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
}
export const Mutation = {
  postCreate: async (
    _: any,
    { title, content }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayLoadType> => {
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

    const post = await prisma.post.create({
      data: { title, content, authorId: 1 },
    });
    return {
      userErrors: [],
      post,
    };
  },
};
