export const keyExtractor = entity =>
  entity.id ??
  console.warn("key extractor tried accessing entity.id, but id doesnt exist");
