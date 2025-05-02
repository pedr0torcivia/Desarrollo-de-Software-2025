import { AlbumModel } from "../databases/db.js";

const albumServices = {
  async getAll() {
    return await AlbumModel.findAll();
  },

  async getById(id) {
    const album = await AlbumModel.findByPk(id);
    return album || null;
  },

  async create(data) {
    if (!data.artista || !data.album || !data.genero || !data.soporte || typeof data.precio !== 'number') {
      throw new Error("Datos incompletos o inválidos");
    }
    return await AlbumModel.create(data);
  },

  async update(id, data) {
    const album = await AlbumModel.findByPk(id);
    if (!album) return null;

    await album.update(data);
    return album;
  },

  async remove(id) {
    const album = await AlbumModel.findByPk(id);
    if (!album) return 0;

    await album.destroy();
    return 1; // Eliminado correctamente
  },
};

export default albumServices;
