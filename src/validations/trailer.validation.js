import Joi from "joi";

const urlPattern =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/i;

export default {
  query: Joi.object().keys({
    url: Joi.string().regex(urlPattern).required().messages({
      "string.pattern.base": `send a valid url`,
    }),
  }),
};
