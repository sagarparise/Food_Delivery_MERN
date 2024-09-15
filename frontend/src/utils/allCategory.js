
export const allCategory = (foods)=>{

  const categoryArr = [];
  const categorySeen = new Set();

  foods.forEach(item => {
    if(!categorySeen.has(item.category)){
      categorySeen.add(item.category);
      categoryArr.push({
        name: item.category,
        image: item.image
      });
    }
  });

  return categoryArr;

}