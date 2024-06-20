export class StringUtil {
  /**
   * Capitalizes the first letter of a given string.
   *
   * @param str - The input string to be capitalized.
   * @returns The input string with the first letter capitalized.
   *
   * @example
   * ```typescript
   * const input = "hello, world!";
   * const output = StringUtil.capitalize(input);
   * console.log(output); // Output: "Hello, world!"
   * ```
   */
  static capitalize(str: string) {
    str = str.toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * This method is used to remove any special characters from a given string.
   * Special characters are defined as any character that is not a letter, a number, or a space.
   *
   * @param str - The input string from which to remove special characters.
   * @returns The input string with all special characters removed.
   *
   * @example
   * ```typescript
   * const input = "Hello, World!";
   * const output = StringUtil.special(input);
   * console.log(output); // Output: "HelloWorld"
   * ```
   */
  static special(str: string) {
    return str.replace(/[^a-zA-Z0-9 ]/g, '')
  }
}
