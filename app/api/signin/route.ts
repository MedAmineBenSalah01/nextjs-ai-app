import db from "../../utils/db";
import bcrypt from "bcrypt";


function isSame (unhashPass:String, hashPass:String) {
  return bcrypt.compare(unhashPass,hashPass)
}



export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await db.users.findFirst({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return new Response(JSON.stringify({ message: "User found." }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: "Incorrect password." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API handler:", error);
    return new Response(JSON.stringify({ "error": error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
