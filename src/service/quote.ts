import {BaseGetSrvc} from "./base";
export class QuoteService extends BaseGetSrvc {
  private readonly resrcUrl = 'quote';

  protected getRsrcName(): string {
    return this.resrcUrl;
  }
}
