import { Injectable } from '@nestjs/common';


@Injectable()
export class UrlCheckerService {

  async check(url: string, signal?: AbortSignal) {
    try {
      const response = await fetch(url, {
        method: 'HEAD', signal
      });

      return {
        httpStatus: response.status,
      };

    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : 'Unknown error'
      };
    }
  }
}