<template>
    <div class="groceryList">
        <h1> Your Grocery List </h1>
        <span>
            <input v-model="newGroceryItem" class="groceryInput" type="text" placeholder="Enter a New Grocery to Add to Your List">
            <button v-on:click="addGroceryListItem()">Add</button>
        </span> 

        <div class="listContent">
            <p v-for="(item, index) in groceryList" :key="item"> 
                {{item}} <button v-on:click="removeGroceryItem(index)" class="removeButt"> &times;</button>
            </p>
            <button v-on:click="saveList()" class="saveButt">Save</button>   
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                groceryList: [],
                newGroceryItem: ""
            }
        }, 

        methods: {
            addGroceryListItem() {
                console.log("Add Item");
                this.groceryList.push(this.newGroceryItem);
                this.newGroceryItem = "";
            }, 

            removeGroceryItem(index) {
                this.$delete(this.groceryList, index);
            }, 

            saveList() {
                let filename = "grocery-list.txt";
                let type = "text/plain;charset=utf-8";
                let data = "";
                this.groceryList.forEach(element => {
                    data += element;
                    data += "\n";
                });
                console.log(data);
                let file = new Blob([data], {type: type});
                if (window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(file, filename);
                }
        
                else { 
                    var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);  
                    }, 0); 
                }
            }
        }
    }

</script>

<style scoped>
.groceryList {
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);

    width: 40%; 
    height: 85%; 
    overflow: auto;

    box-shadow: 4px 4px 4px 4px rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
}

.groceryInput {
    border-style:solid;
    border-width: .5px;
    padding: 2px;
    width: 65%;
    margin-right:3%
}

.listContent {
    width: 85%;
    float: left;
    margin-top: 2%;
    margin-left: 15%;
    text-align: left;
}

.removeButt {
    float: right;
    margin-right: 15%;
}

.saveButt {
    margin-left: 35%;
    margin-right: 50%;
}

button {
   background-color: #008CBA;;
   color: white;
   font-size: 16px;
   padding: 4px 12px;
   border-radius: 8px;
}

</style>