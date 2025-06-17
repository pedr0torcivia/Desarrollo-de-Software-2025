import Alquiler from "../models/alquiler.js";
import RepositorioBase from "./repositorioBase.js";

class AlquilerRepository extends RepositorioBase {
    constructor() {
        super(Alquiler);
    }
}

export default new AlquilerRepository();