import { Injectable } from '@nestjs/common';


@Injectable()
export class UrlCheckerService {

  async check(url: string) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
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