import ky, { type HTTPError } from 'ky';

export const httpClient = ky.create({
  prefixUrl: 'http://localhost:8080/api',
  hooks: {
    beforeRequest: [
      (request) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth-token')?.replaceAll('"', '');
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          const body = await response.json<ApiErrorBody>();
          throw new ErrorResponse({
            ...body,
            status: response.status,
          });
        }
      },
    ],
  },
});

//200대가 아닌 오류 발생시 코드,메시지,타임스탬프
interface ApiErrorBody {
  code: string;
  message: string;
  timestamp: string;
}

export class ErrorResponse extends Error {
  readonly code: string;
  readonly timestamp: string;
  readonly status: number;

  constructor({
    code,
    message,
    timestamp,
    status,
  }: ApiErrorBody & { status: number }) {
    super(message);
    this.name = 'ErrorResponse';
    this.code = code;
    this.timestamp = timestamp;
    this.status = status;
  }

  static async fromHTTPError(error: HTTPError): Promise<ErrorResponse> {
    const body = await error.response.json<ApiErrorBody>();
    return new ErrorResponse({
      ...body,
      status: error.response.status,
    });
  }
}
