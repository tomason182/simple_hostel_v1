import { API_URL } from "../config/env.ts";

// interface RequestOptions {
//   headers?: HeadersInit;
//   signal?: AbortSignal;
// }

class ApiClient {
  public async get<T>(endpoint: string): Promise<T> {
    const response = await fetch((`${API_URL}${endpoint}`), { credentials: "include" });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  public async post<TRequest, TResposne>(endpoint: string, body: TRequest): Promise<TResposne> {

    const response = await fetch(`${API_URL}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    this.ensureSuccess(response);

    return await response.json();
  }

  private ensureSuccess(response: Response): void {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  }
};

export default new ApiClient();
