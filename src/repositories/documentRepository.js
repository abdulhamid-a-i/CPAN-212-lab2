import { deleteIndex, readIndex, writeIndex } from "../utils/fileStore.js";

export const documentRepository = {
  async list() {
    return await readIndex();
  },

  async getById(id) {
    const docs = await readIndex();
    return docs.find((d) => d.id === id) ?? null;
  },

  async saveNew(doc) {
    const docs = await readIndex();
    docs.push(doc);
    await writeIndex(docs);
    return doc;
  },

  async replaceById(id, replacerFn) {
    const docs = await readIndex();
    const idx = docs.findIndex((d) => d.id === id);
    if (idx < 0) return null;
    const updated = replacerFn(docs[idx]);
    docs[idx] = updated;
    await writeIndex(docs);
    return updated;
  },

  async deleteFileById(id){
    // Deletes from index 
    const docs = await readIndex()
    if (id < 0) return null;
    const idx = docs.findIndex((d) => d.id === id);
    const updatedDocs = docs.filter(d => d.id !== id);
    await deleteIndex(updatedDocs);
    return {ok: true}
  }
};
