import { PostRequest } from 'models/posts/post.dto';
import { PrismaService } from './prisma.service';


export class PostService {
  private readonly prismaService: PrismaService
  constructor() {
    this.prismaService = new PrismaService()
  }
  createPost(post: PostRequest, userId: number) {
    return this.prismaService.task.create({
      data: {
        title: post.title,
        description: post.description,
        published: post.published,
        notes: post.notes,
        userId: userId,
      },
    });
  }

  getMyPosts(userId: number) {
    return this.prismaService.task.findMany()
  }
}
