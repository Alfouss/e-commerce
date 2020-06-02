import axios from "axios";

export const allDataProducts = async () => {
    let products = await axios.get("http://localhost:1234/product/read");
    return products;
};

export const pictureGet = (e) => {
    
    if(e.target.photo.type === 'file'){
        
        if(e.target.photo.files[0] !== undefined){
            console.log(e.target.photo.files[0].name)
            return e.target.photo.files[0].name;
        }
    }
    if(e.target.photo.type === 'text'){
        let path = e.target.photo.value;
        let nameImg = path.split('\\');

        // if input not change
        if(nameImg.length === 1){
            
            return nameImg[0];
        }

        //Split the path of image
        return nameImg[2];
        
    }
}

export const addArticle = async (e) => {
    e.preventDefault();
        let namePic = pictureGet(e);
        let data = {
            article: e.target.article.value,
            describe: e.target.describe.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            photo: namePic,
            category: e.target.category.value
            
        }

        await axios.post("http://localhost:1234/product/create", data);
}

export const updateProduct = async (e) => {
    e.preventDefault();
    let namePic = pictureGet(e);
    let data = {
        id: e.target.id.value,
        article: e.target.article.value,
        describe: e.target.describe.value,
        price: e.target.price.value,
        quantity: e.target.quantity.value,
        photo: namePic,
        category: e.target.category.value
    }
    await axios.put("http://localhost:1234/product/update", data);
}

//data is id of products
export const deleteProduct = async (data) => {
    await axios.delete("http://localhost:1234/product/delete", {data});
}