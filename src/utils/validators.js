export function validateProduct(data) {
  const errors = {};
  if(!data.title || data.title.trim().length < 3) errors.title = "Title must be at least 3 characters.";
  if(!data.price || Number.isNaN(Number(data.price)) || Number(data.price) <= 0) errors.price = "Price must be a positive number.";
  if(!data.category || data.category.trim().length === 0) errors.category = "Category is required.";
  if(!data.image || !isValidUrl(data.image)) errors.image = "A valid image URL is required.";
  if(!data.description || data.description.trim().length < 10) errors.description = "Description must be at least 10 characters.";
  return errors;
}

function isValidUrl(str){
  try{
    new URL(str);
    return true;
  }catch(e){
    return false;
  }
}
