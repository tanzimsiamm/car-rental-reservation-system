import { ZodError, ZodIssue } from "zod";
import {
  TErrorMessages,
  TGenericErrorResponse,
} from "../interface/error.interface";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessages: TErrorMessages = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages,
  };
};

export default handleZodError;
