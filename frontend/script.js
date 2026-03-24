function addExpense(){

    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    fetch("http://localhost:8080/expenses",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            amount: amount,
            category: category
        })
    })
    .then(() => loadExpenses());
}


function loadExpenses(){
    fetch("http://localhost:8080/expenses")
    .then(res => res.json())
    .then(data => {

        let list = document.getElementById("list");
        list.innerHTML = "";

     let total = 0;
        data.forEach(e => {
            let li = document.createElement("li");

            li.innerText = e.title + " - ₹" + e.amount + " ";

            let btn = document.createElement("button");
            btn.innerText = "❌";

            btn.onclick = function () {
                deleteExpense(e.id);
            };
            let editBtn = document.createElement("button");
                editBtn.innerText = "✏️";

               editBtn.onclick = function () {
               editExpense(e);
            };

          editBtn.className = "edit-btn"; 

            li.appendChild(editBtn);
            li.appendChild(btn);
            list.appendChild(li);

            total += e.amount;
        });
        
        document.getElementById("total").innerText = total;
    });
}


function deleteExpense(id){
    fetch("http://localhost:8080/expenses/" + id,{
        method: "DELETE"
    })
    .then(() => loadExpenses());
}
function editExpense(expense){

    let newTitle = prompt("Enter new title", expense.title);
    let newAmount = prompt("Enter new amount", expense.amount);
    let newCategory = prompt("Enter new category", expense.category);

    if(newTitle === null || newAmount === null || newCategory === null){
        return;
    }

    fetch("http://localhost:8080/expenses/" + expense.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle,
            amount: Number(newAmount),
            category: newCategory
        })
    })
    .then(() => loadExpenses());
}
window.onload = loadExpenses;