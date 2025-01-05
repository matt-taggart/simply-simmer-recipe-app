import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import * as htmlparser2 from "htmlparser2";
import { OpenAI } from "openai";

import { Models } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getLastMessageContent = (
  textMessage: string,
  imageUrl: string | undefined
) => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: "text",
      text: textMessage,
    },
    {
      type: "image_url",
      image_url: {
        url: imageUrl,
      },
    },
  ];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, data = {} }: { messages: Message[]; data: any } = body;
    const lastMessage = messages.pop();

    if (!messages || !lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        {
          error:
            "messages are required in the request body and the last message must be from the user",
        },
        { status: 400 }
      );
    }

    const lastMessageContent = getLastMessageContent(
      lastMessage.content,
      data?.imageUrl
    );

    const openai = new OpenAI();

    if (data?.askAI) {
      try {
        const response = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Can you please modify the ingredients and instructions from the recipe and display it in a clean, organized Markdown format based on the user's requested modifications below? \n. The recipe is delimited below by the *** symbols and the modifications are delimited by ### symbols. \n *** ${data.recipe} *** \n ### ${lastMessageContent} ### Don't use a preamble or heading when returning results. The recipe name, ingredients, instructions, and modifications should be returned as Markdown in the following JSON format: { name: "", ingredients: "", instructions: "", modifications: "" }. Always display ingredients as a bulleted list written in Markdown format. Please explain why recipe was modified separately from instructions. If the user's query doesn't make sense or isn't recipe-related, return the following json: { error: false }`,
            },
          ],
          stream: true,
          model: Models.GPT4,
          response_format: { type: "json_object" },
        });

        const stream = OpenAIStream(response);

        // Respond with the stream
        return new StreamingTextResponse(stream);
      } catch (error) {
        console.error("[Ask AI Error]", error);
        return NextResponse.json(
          {
            error: (error as Error).message,
          },
          {
            status: 500,
          }
        );
      }
    }

    try {
      const htmlResponse = await fetch(lastMessageContent);
      const html = await htmlResponse.text();

      let parsedText = "";
      let skipText = false; // Flag to skip text inside script or style tags

      const parser = new htmlparser2.Parser(
        {
          onopentag(name) {
            if (name === "script" || name === "style") {
              skipText = true;
            }
          },
          ontext(text) {
            if (!skipText) {
              parsedText += text;
            }
          },
          onclosetag(tagname) {
            if (tagname === "script" || tagname === "style") {
              skipText = false;
            }
          },
          oncomment() {
            // Ignore comments
          },
        },
        { decodeEntities: true }
      );

      parser.write(html);
      parser.end();

      // Remove excessive whitespace
      parsedText = parsedText.trim().replace(/\s+/g, " ");

      const query = `Can you please extract the recipe from the following text and display it in a clean, organized Markdown format? \n ${parsedText}. Don't use a preamble when returning results. The recipe name, ingredients, and instructions should be returned as Markdown in the following JSON format: { name: "", ingredients: "", instructions: "" }. Always display ingredients as a bulleted list written in Markdown format. If the user's query doesn't make sense or isn't recipe-related, or the url doesn't have a url, return the following json: { error: false }`;

      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
        stream: true,
        model: Models.GPT4,
        response_format: { type: "json_object" },
      });

      const stream = OpenAIStream(response);

      // Respond with the stream
      return new StreamingTextResponse(stream);
    } catch (error) {
      console.error("[HTMLError]", error);
    }
  } catch (error) {
    console.error("[OpenAIError]", error);
    return NextResponse.json(
      {
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
