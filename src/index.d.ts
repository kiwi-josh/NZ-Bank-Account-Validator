export default class NzBankAccountValidator {
    static getId(input: string): string | Record<string, unknown>;
    static getBranch(input: string): string | Record<string, unknown>;
    static getBase(input: string): string | Record<string, unknown>;
    static getSuffix(input: string): string | Record<string, unknown>;
    static isPartsObject(obj?: Record<string, unknown>): boolean;
    static splitString(str?: string): string[];
    static getPartsObject(input: string): string | Record<string, unknown> | {
          id: string;
          branch: string;
          base: string;
          suffix: string;
      };
    static partsObjectValid(obj?: Record<string, unknown>): boolean;
    static validate(input: string): boolean;
    static getBankData(id: string, branch: string): Record<string, unknown>;
    static getChecksum(input: string): Record<string, unknown>;
  }