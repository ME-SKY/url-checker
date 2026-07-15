import { Injectable } from '@nestjs/common';


@Injectable()
export class UrlCheckerService {

  async check(url: string) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
      });

      const delay =
        Math.floor(
          Math.random() * 10000
        );

      await this.delay(delay);

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

  private delay(ms: number) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }
}