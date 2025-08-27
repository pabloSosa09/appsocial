"use server"

import { revalidatePath } from "next/cache";
import { getDbUserId } from "./user.action"
import prisma from "@/lib/prisma";



export const createPost = async(content:string, imageUrl:string) => {
  try {
    const userId = await getDbUserId();

    const post = await prisma.post.create({
        data:{
            content, 
            image: imageUrl,
            authorId: userId,
        }
    })

    revalidatePath("/");
    return {success: true, post};
  } catch (error) {
    console.error("Failed to create post:", error);
    return {success: false, error:"Failed to create post"};
  }
}
