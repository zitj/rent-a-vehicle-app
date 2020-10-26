const panels = document.getElementsByClassName('panel');

//Customer Panel
const customerPanel = document.getElementById('customer-panel');
const customerFormContainer = customerPanel.querySelector('.form-container');
const customerDataContainer = customerPanel.querySelector('.data-container');
const inputs = customerFormContainer.querySelectorAll('input');
const customerStoreDataButton = document.getElementById('submit');
const table = customerDataContainer.querySelector('table');
const nameInput = inputs[0];
const emailInput = inputs[1];
const mobileInput = inputs[2];
const controlIdEdit = document.getElementById('controlIdEdit');

//Vehicle Panel
const vehiclePanel = document.getElementById('vehicle-panel');

//Navigation with button
const navigation = document.querySelector('nav');
const navButtons = navigation.querySelectorAll('a');

//Vehicle Panel


const classRemoverNavButton = () =>{
    for(let navButton of navButtons){
        navButton.classList.remove('active');
    }
}
const classRemoverPanels = () =>{
    for(let panel of panels){
        panel.classList.remove('active');
    }
}
for(let navButton of navButtons){
    navButton.addEventListener('click', ()=>{
        classRemoverNavButton();
        classRemoverPanels();
        navButton.classList.toggle('active');
    });
}
navButtons[0].addEventListener('click', ()=>{
    classRemoverPanels();
    customerPanel.classList.add('active');
});
navButtons[1].addEventListener('click', ()=>{
    classRemoverPanels();
    vehiclePanel.classList.add('active');
});
navButtons[2].addEventListener('click', ()=>{
    classRemoverPanels();
    panels[2].classList.add('active');
});

class Customer{
    constructor(id,name,email,mobile)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
    }
    
    showCustomerData()
    {
        Customer.renderCustomerHtml(this.id,this.name,this.email,this.mobile);
        return this;
    }
    
    storeCustomer()
    {
        const allData = JSON.parse(localStorage.getItem('customers')) ?? [];
        allData.push({id:this.id,name:this.name,email:this.email,mobile:this.mobile});
        localStorage.setItem('customers',JSON.stringify(allData));
    }

    static showAllCustomers()
    {
        if(localStorage.getItem('customers')){
            JSON.parse(localStorage.getItem('customers')).forEach((item)=>{
                Customer.renderCustomerHtml(item.id,item.name,item.email,item.mobile)
        })
    }
    }
    //update element
    updateCustomer(id)
    {
        const newItem = {id:id,name:this.name,email:this.email,mobile:this.mobile};
        const UpdatedData = JSON.parse(localStorage.getItem('customers')).map((item)=>{
            if(item.id == id){
                return newItem;
            }
            return item;
        })

        localStorage.setItem('customers', JSON.stringify(UpdatedData));
    }

    static renderCustomerHtml(id,name,email,mobile)
    {
        const trEl = document.createElement('tr');
                trEl.innerHTML = `
                    <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${mobile}</td>
                    <td>
                        <button class="edit" data-id="${id}">Edit</button>
                        <button class="delete" data-id="${id}">Delete</button>
                    </td>
                    </tr>
                `
                table.appendChild(trEl);
            
    }
}

Customer.showAllCustomers();

customerStoreDataButton.addEventListener('click', (e)=>{
    
    e.preventDefault();
    
    if(nameInput.value == '' || emailInput.value == '' || mobileInput.value == ''){
        return;
    }
    if(!controlIdEdit.value){
        let id = Math.floor(Math.random() * 1000000);
        const newCustomer = new Customer(id,nameInput.value, emailInput.value, mobileInput.value);
        newCustomer.showCustomerData().storeCustomer();
    }
    else
    {
        const id = controlIdEdit.value;
        const newCustomer = new Customer(id,nameInput.value, emailInput.value, mobileInput.value);
        newCustomer.updateCustomer(id);
        customerStoreDataButton.value = 'Update data';
        table.innerHTML = `  
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Action</th>
      </tr>`;
        Customer.showAllCustomers();
    }
    nameInput.value = '';
    emailInput.value = '';
    mobileInput.value = '';
});

customerDataContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete'))
    {

        //remove from locals
        const id = +e.target.getAttribute("data-id");
        const emps = JSON.parse(localStorage.getItem('customers'));
        const newData = emps.filter(item => item.id != id);
        localStorage.setItem('customers', JSON.stringify(newData));
        
        // remove from html
        e.target.parentElement.parentElement.remove();

    }
  
    if(e.target.classList.contains('edit'))
    {

        const id = +e.target.getAttribute("data-id");
        const item = JSON.parse(localStorage.getItem('customers')).find(item => item.id == id);
        nameInput.value = item.name;
        emailInput.value = item.email;
        mobileInput.value = item.mobile;
        controlIdEdit.value = id;
        customerStoreDataButton.value = 'Update data';
        console.log(item);
    }
});