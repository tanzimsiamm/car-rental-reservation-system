/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TErrorMessages,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorMessages: TErrorMessages = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid ID",
    errorMessages,
  };
};

export default handleDuplicateError;
