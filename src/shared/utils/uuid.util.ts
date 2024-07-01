export class UUID {
  /**
   * Generates a random UUID.
   * @returns A string representation of the generated UUID.
   */
  static generate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }

  /**
   * Validates a given UUID string.
   * @param uuid - The UUID string to validate.
   * @returns True if the UUID is valid, false otherwise.
   */
  static validate(uuid: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuid
    )
  }
}
