import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-Wq7TAyb2Fewb1T3iaW58XAni",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
