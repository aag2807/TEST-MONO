import { ArgumentNullError } from "../errors/ArgumentNullError";
import { InvalidArgumentError } from "../errors/InvalidArgumentError";

export class Arguments {

  public static isNotNull<T>(value: T, error: string = "Argument is null or undefined"): [T, boolean] {
    if(value === null || value === undefined) {
      throw new ArgumentNullError(error);
    }
    return [value, value !== null];
  }

  public static isEmptyOrWhiteSpace(value: string, error: string = "Argument is empty or white space"): [string, boolean] {
    if(value === null || value === undefined) {
      throw new ArgumentNullError("Argument is null or undefined");
    }

    if(value.trim() === "") {
      throw new InvalidArgumentError(error);
    }

    return [value, value !== null];
  }

  public static isGreaterThan(value: number, min: number, error: string = "Argument is less than min"): [number, boolean] {
    if(value <= min) {
      throw new InvalidArgumentError(error);
    }
    return [value, value !== null];
  }
}


export class State {

  public static isTrue(expression: boolean, error:string = "Expression is not true"): boolean {
    if(!expression) {
      throw new InvalidArgumentError(error);
    }
    return true;
  }

  public static isFalse(expression: boolean, error:string = "Expression is not true"): boolean {
    if(expression) {
      throw new InvalidArgumentError(error);
    }
    return true;
  }

}
