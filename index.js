document.querySelector('#ewallet-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // console.log('submitted');

    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;

    if (desc && value) {
        addItems(type, desc, value);
        resetForm();
    }

});
/*******************************/
//  ************* UI *************
/********************************/

/************* Show data from local storage *************/
showItems();

function showItems() {
    let items = getItemsFromLS();


    const collection = document.querySelector('.collection');

    for (let item of items) {
        const newHtml = `
          <div class="item">
            <div class="item-description-time">
              <div class="item-description">
                <p>${item.desc}</p>
              </div>
              <div class="item-time">
                <p>${item.time}</p>
              </div>
            </div>
            <div class="item-amount ${item.type === '+' ? 'income-amount' : 'expense-amount'}">
              <p>${item.type}$${item.value}</p>
            </div>
          </div>
          `;
        collection.insertAdjacentHTML('afterbegin', newHtml);
    }

} //.Show data from local storage 


function addItems(type, desc, value) {
    const time = getFormattedTime();
    const newHtml = `
                  <div class="item">
                    <div class="item-description-time">
                      <div class="item-description">
                        <p>${desc}</p>
                      </div>
                      <div class="item-time">
                        <p>${time}</p>
                      </div>
                    </div>
                    <div class="item-amount ${type === '+' ? 'income-amount':'expense-amount'}">
                      <p>${type}$${value}</p>
                    </div>
                  </div>
                  `

    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHtml);

    addItemsToLS(desc, time, type, value);
}

function resetForm() {
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}
/*******************************/
//   Store data into local storage
/********************************/
function getItemsFromLS() {
    let items = localStorage.getItem('items');

    if (items) {
        items = JSON.parse(items);
    } else {
        items = [];
    }
    return items;
}

function addItemsToLS(desc, time, type, value) {

    let items = getItemsFromLS();

    items.push({ desc, time, type, value });

    localStorage.setItem('items', JSON.stringify(items));
}

//*****************************//
//   Utitlity function
//*****************************//
function getFormattedTime() {
    const now = new Date().toLocaleTimeString('en-us', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return `${date[1]} ${date[0]},${time}`;

}