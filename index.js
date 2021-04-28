//UI
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
    console.log(newHtml);

    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHtml);
}

function resetForm() {
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}

//Utitlity function
function getFormattedTime() {
    const now = new Date().toLocaleTimeString('en-us', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    const formattedTime = `${date[1]} ${date[0]},${time}`;

    return formattedTime;
}