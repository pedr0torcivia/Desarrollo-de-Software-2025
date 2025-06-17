export default class NotImplementedError extends Error {
  constructor(msg = "Método no implementado") {
    super(msg);
    this.name = "NotImplementedError";
  }
}