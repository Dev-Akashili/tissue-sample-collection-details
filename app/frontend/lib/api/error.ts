export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleRequestError(error: any) {
  let errorMessage: string;
  if (error instanceof ApiError) errorMessage = error.message;
  else errorMessage = String(error);
  return { message: errorMessage };
}
