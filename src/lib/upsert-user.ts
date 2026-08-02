import { User, type UserDocument } from "@/lib/models/User";

type UpsertUserInput = {
  clerkId: string;
  email: string;
  name: string;
  image?: string | null;
  phone?: string | null;
  lastSignInAt?: Date;
};

/**
 * Upsert by clerkId, or reclaim an existing email row when the user
 * switched Clerk instances (dev → prod) and got a new clerkId.
 */
export async function upsertClerkUser(
  input: UpsertUserInput
): Promise<UserDocument> {
  const email = input.email.toLowerCase().trim();
  const update = {
    clerkId: input.clerkId,
    name: input.name,
    email,
    image: input.image || undefined,
    provider: "clerk",
    ...(input.phone ? { phone: input.phone } : {}),
    ...(input.lastSignInAt ? { lastSignInAt: input.lastSignInAt } : {}),
  };

  const existing =
    (await User.findOne({ clerkId: input.clerkId })) ||
    (await User.findOne({ email }));

  if (existing) {
    existing.set(update);
    await existing.save();
    return existing;
  }

  return User.create(update);
}
