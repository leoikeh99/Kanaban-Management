import Authenticate from "middleware/authenticate";
import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/lib/openAi";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { boardName } = req.body.data;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Based on the topic: ${boardName}, Generate a task title, a description and three subtasks`,
      temperature: 0.6,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    });

    let filteredResponse = response.data.choices[0].text
      ?.split("\n")
      .filter(
        (choice) => !(choice.trim() === "" || choice.trim() === "Subtasks:")
      );
    filteredResponse = !filteredResponse ? [] : filteredResponse;

    const data = {
      title: filteredResponse[0].substring(12).trim(),
      description: filteredResponse[1].substring(13).trim(),
      subtasks: [
        filteredResponse[2].substring(3).trim(),
        filteredResponse[3].substring(3).trim(),
        filteredResponse[4].substring(3).trim(),
      ],
    };

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
}

export default Authenticate(handler, "POST");
