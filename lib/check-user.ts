import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const checkUser = async () => {
    const user = await currentUser();

    if (!user) return null;

    try {
        const loggedInUser = await prisma.user.findUnique({
            where: {
                externalId: user.id,
            },
        });

        if (loggedInUser) {
            return loggedInUser;
        }
    } catch (error) {
        console.log(error)
    }
};