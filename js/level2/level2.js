const listKey = "list"
let bookList = retriveFromStorage();
createList();

const button = document.querySelector("button")
const titleInput = document.querySelector(".titleInput")
const isbnInput = document.querySelector(".isbnInput")

button.addEventListener("click", addToList);

function addToList() {
    const newTitle = titleInput.value;
    const newISBN = isbnInput.value.trim();
    const newBook = "Title:" + newTitle + " " + "ISBN:" + newISBN;

    if(newTitle.length >= 2 && newISBN.length >= 3) {
        const newBook = "Title:" + newTitle + " " + "ISBN:" + newISBN;
        bookList.push(newBook)
        createList()
        saveToStorage(bookList)
        console.log(bookList)
    } 
}

function createList() {
    const newBookContainer = document.querySelector(".new_book-container");

    newBookContainer.innerHTML = "";

    bookList.forEach(function (book){ 
        newBookContainer.innerHTML +=   `<div class="newBook">
                                            <h3>${book}</h3>
                                            <i class="fa fa-trash" data-book="${book}">
                                        </div>` 
    });
     

    const trashCans = document.querySelectorAll(".newBook i");

    trashCans.forEach(function (can) {
        can.addEventListener("click", removeFromList);
    });

}

function removeFromList() {
    console.log(event)

    const deleteThisBook = event.target.dataset.book;

    const newList = bookList.filter(function (book) {
        if (deleteThisBook !== book){
            return true;
        }
    });

    bookList = newList;

    createList()
}

function saveToStorage(valueToSave) {
    localStorage.setItem(listKey, JSON.stringify(valueToSave));
}

function retriveFromStorage() {
    const currentList = localStorage.getItem(listKey)

    if(!currentList) {
        return []
    }

    return JSON.parse(currentList);
        
}
