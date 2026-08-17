import { clerkClient, getAuth } from "@clerk/express";

// Middleware to check userId and hasPremiumPlan

export const auth = async (req, res, next)=>{
  try {
    const {userId} = getAuth(req);
    if (!userId) {
return res.status(401).json({ success: false, message: "Unauthorized" });
}

// Mendapatkan instance clerk client
const client = clerkClient;

// Mendapatkan data user
const user = await client.users.getUser(userId);

// Cek plan (asumsi ini logic custom Anda)
const hasPremiumPlan = user.publicMetadata?.plan === 'premium';

if (!hasPremiumPlan && user.privateMetadata?.free_usage !== undefined) {
req.free_usage = user.privateMetadata.free_usage;
} else {
await client.users.updateUserMetadata(userId, {
privateMetadata: { free_usage: 0 }
});
req.free_usage = 0;
}

req.userId = userId;
req.plan = hasPremiumPlan ? 'premium' : 'free';
next();
} catch (error) {
res.json({ success: false, message: error.message });
}
};