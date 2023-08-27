import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const response = await axios.post(
    "https://api.clerk.com/v1/invitations",
    {
      "redirect_url": "https://rivero.vercel.app/sign-up",
      email_address: "felipeeperez3@gmail.com",
      public_metadata: {
        role: "STUDENT",
        school: "Colegio Alejandria",
        grade: "4° Medio A",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_BACKEND_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response)
  res.status(200).json(response);
}
