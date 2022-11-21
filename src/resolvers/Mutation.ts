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
    { title, content }: any,
    { prisma }: Context
  ): Promise<PostPayLoadType> => {
    return {
      userErrors: [],
      post: null,
    };
    // const post = await prisma.post.create({
    //   data: { title, content, authorId: 1 },
    // });
  },
};
