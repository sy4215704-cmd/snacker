
let cart = document.querySelector('.cart');
let display = document.querySelector('.container');
let inputval = document.querySelector('.input');
let spinner = document.querySelector('.loader');

fetchingdata();

function fetchingdata() {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputval.value}`)
        .then(response => response.json())
        .then(data => {
            if (!data.meals) {
                display.innerHTML = `
                <div class="error">
                <h1>Recipes not found. Please try again....</h1>
              <div>  <a href="index.html"><button>Back</button></a></div>
                </div>`;
            }
            spinner.style.display = 'none';
            let newhtml = '';
            data.meals.forEach(meal => {
                newhtml += `
             <div class="cart">
                  <image src="${meal.strMealThumb}" class="image"></image>
                   <div class="same">
                      <span class="left">Name; </span>
                       <span class="right">${meal.strMeal}</span>
                   </div>
                    
                   <div class="same">
                      <span class="left">Country; </span>
                       <span class="right">${meal.strArea}</span>
                   </div>
                <div class="instruction"> 
                    <button onclick="viewInstruction('${meal.idMeal}');">View Instruction</button>
                </div>
                 <div class="video">
                   <a href="${meal.strYoutube}"> <button >Youtube Video</button></a>
                 </div>

            </div> `;
            });

            display.innerHTML = newhtml;
        })
};

function viewInstruction(idMeal) {
    let contain_popup = document.querySelector('.popup');
    contain_popup.style.display = 'block';
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            contain_popup.innerHTML = `
                    <button onclick="closebtn()">close</button>
                    <h1>Title</h1>
                    <p class="title">${meal.strMeal}</p>
                    <hr>
                    <h1>Instruction</h1>
                    <p class="Construction">${meal.strInstructions}</p>
            
            `;
        }
        );
};

function closebtn() {
    let contain_popup = document.querySelector('.popup');
    contain_popup.style.display = 'none';

};
