export const folderImageStructure = (images) => {
  var structure = [];
  for (var i = 0; i < images.length; i++) {
    const dividedImage = images[i].split("/");
    const folder = dividedImage[1];
    if (!structure.find((element) => element.name === folder)) {
      structure.push({ name: folder, content: [] });
      structure[structure.length - 1].content.push(images[i]);
    } else {
      structure
        .find((element) => element.name === folder)
        .content.push(images[i]);
    }
  }
  return structure;
};
