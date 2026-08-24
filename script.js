//The master list of all foods I've defined. Lives here so it persists between clicks.
const foods =[];

// Grab the form element from the page using its id
const form = document.getElementById("add-food-form");
// Grab the ul element from the page using its id
const foodList = document.getElementById("food-list");

let plan = [];
const planList = document.getElementById("plan-list");

// Store the food dato inside the browser
function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
};

function savePlan(){
    localStorage.setItem("plan", JSON.stringify(plan));
};

// Draw the foods array onto the page. Called whenever foods changes
function renderFoods() {

    // 1. Clear whatever is currently shown
    foodList.innerHTML = "";
    
    // 2. Build one <li> for each food and add it to the list
    for (const food of foods) {
        const li = document.createElement("li");
        li.textContent = food.name + " — " + food.calories + " kcal, " + food.protein + "g protein";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.id = food.id;
        removeBtn.dataset.action = "remove";

        const addToPlanBtn = document.createElement("button");
        addToPlanBtn.textContent = "Add to plan";
        addToPlanBtn.dataset.id = food.id;
        addToPlanBtn.dataset.action = "add-to-plan";

        li.appendChild(addToPlanBtn);
        li.appendChild(removeBtn);
        foodList.appendChild(li);
    }
};

// Draw the plan array onto the page. Called whenever plan changes
function renderPlan() {
    planList.innerHTML = "";

    for (const entry of plan) {
        //Look up the food this entry references
        const food = foods.find(function(f) {
            return f.id === entry.foodId;
        });

        // Calculate this entry's contribution: per-unit values x quantity
        const entryCalories = food.calories * entry.quantity;
        const entryProtein = food.protein * entry.quantity;

        const li = document.createElement("li");
        li.textContent = food.name + " x" + entry.quantity + " — " + 
        entryCalories + " kcal, " + entryProtein + "g protein";

        planList.appendChild(li);
    }
}

// Run this function whenever the form is submited
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Read the three values from the input boxes
    const name = document.getElementById("food-name").value;
    const calories = Number(document.getElementById("food-calories").value);
    const protein = Number(document.getElementById("food-protein").value);

    //Bundle the three values into one food object
    const food = { id: Date.now(), name: name, calories: calories, protein: protein };

    //Add that object to the master list
    foods.push(food);
    saveFoods();

    form.reset();

    renderFoods();
});

foodList.addEventListener("click", function (event) {
    const button = event.target;
    if (button.tagName !== "BUTTON") return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "remove") {
        const index = foods.findIndex(function (food) {
            return food.id === id;
        });
        foods.splice(index, 1);

        //Cascade: keep only plan entries that DON'T reference the romoved food
        plan = plan.filter(function (entry) {
            return entry.foodId !== id;
        });
        
        saveFoods();
        savePlan();
        renderFoods();
        renderPlan();
    }
    
    if (action === "add-to-plan") {
        plan.push({ foodId: id, quantity: 1});
        savePlan();
        renderPlan();
    }
});

function loadFoods() {
    const stored = localStorage.getItem("foods");
    if (stored) {
        const parsed = JSON.parse(stored);
        for (const food of parsed) {
            foods.push(food);
        }
    }
    renderFoods();
};

function loadPlan() {
    const stored = localStorage.getItem("plan");
    if (stored) {
        plan = JSON.parse(stored);
    }
    renderPlan();
};


loadFoods();
loadPlan();