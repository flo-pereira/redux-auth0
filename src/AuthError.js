export default class extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
