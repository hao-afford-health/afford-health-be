const { ChatOpenAI } = require('langchain/chat_models/openai');
const { ChatPromptTemplate, HumanMessagePromptTemplate } = require('langchain/prompts');
const { createStructuredOutputChainFromZod } = require('langchain/chains/openai_functions');

const schema = require('../database/schema');
const { InsuranceCardSchema, MedicalBillSchema, EOBSchema } = schema;

require('dotenv').config();

const structureData = async (fileType, inputText) => {
  let zodSchema;
  if (fileType === 'InsuranceCard') {
    zodSchema = InsuranceCardSchema;
  } else if (fileType === 'MedicalBill') {
    zodSchema = MedicalBillSchema;
  } else {
    zodSchema = EOBSchema;
  }

  const prompt = new ChatPromptTemplate({
    promptMessages: [
      HumanMessagePromptTemplate.fromTemplate("{inputText}"),
    ],
    inputVariables: ["inputText"],
  });

  const llm = new ChatOpenAI();

  const chain = createStructuredOutputChainFromZod(zodSchema, {
    prompt,
    llm,
  });
  
  const response = await chain.call({
    inputText: inputText
  });

  return response;
}

module.exports = { structureData };