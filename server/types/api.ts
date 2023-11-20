export namespace API {
  export type Response<T> = {
    success: boolean;
    content: T[];
    statusCode: number;
    message?: string;
  };
}
