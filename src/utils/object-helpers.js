export const updateObjectInArray = (
  items,
  itemId,
  objPropName,
  newObjProps
) => {
  return items.map((u) => {
    if (u[objPropName] === itemId) {
      // u.id - это все равно, что u["id"]
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
