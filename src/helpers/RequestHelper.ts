import axios from 'axios';

const SECRET: string = process.env.NEXT_PUBLIC_MOCKAPI_SECRET || '';
const BASE_URL: string = `https://${SECRET}.mockapi.io/`;

interface IPayload {
  [key: string | number]: string | number | boolean | object | null;
}

export default class RequestHelper {
  public static async get<T>(endpoint: string): Promise<T | null> {
    let data: T | null = null;

    try {
      const response = await axios.get<T>(`${BASE_URL}${endpoint}`);
      if (response.statusText === 'OK') {
        data = response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  }

  public static async post<T>(
    endpoint: string,
    payload: IPayload
  ): Promise<T | null> {
    let data: T | null = null;

    try {
      const response = await axios.post<T>(`${BASE_URL}${endpoint}`, payload);
      if (response.statusText === 'Created') {
        data = response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  }

  public static async put<T>(
    endpoint: string,
    payload: IPayload
  ): Promise<T | null> {
    let data: T | null = null;

    try {
      const response = await axios.put<T>(`${BASE_URL}${endpoint}`, payload);
      if (response.statusText === 'OK') {
        data = response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  }

  public static async delete<T>(endpoint: string): Promise<T | null> {
    let data: T | null = null;

    try {
      const response = await axios.delete<T>(`${BASE_URL}${endpoint}`);
      if (response.statusText === 'OK') {
        data = response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  }
}
