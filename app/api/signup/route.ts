import db from "../../utils/db";
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const data = await request.json();
    const hashedPassword = await bcrypt.hash(data.password,10);
    const newUser = await db.users.create({
        data:{
            email:data.email,
            password:hashedPassword
        }
    })
    return new Response(JSON.stringify({ message: "User created successfully", newUser }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API handler:", error);


    return new Response(JSON.stringify({ error: "An internal error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
