const panels = document.getElementsByClassName('panel');

//Customer Panel
const customerPanel = document.getElementById('customer-panel');
const customerFormContainer = customerPanel.querySelector('.form-container');
const customerDataContainer = customerPanel.querySelector('.data-container');
const table = customerDataContainer.querySelector('table');
//Customer Inputs
const inputs = customerFormContainer.querySelectorAll('input');
const nameInput = inputs[0];
const emailInput = inputs[1];
const mobileInput = inputs[2];
//Customer Button
const customerStoreDataButton = document.getElementById('submit');
const controlIdEdit = document.getElementById('controlIdEdit');

//Vehicle Panel
const vehiclePanel = document.getElementById('vehicle-panel');
const vehicleFormContainer = vehiclePanel.querySelector('.form-container');
const vehicleDataContainer = vehiclePanel.querySelector('.data-container');
//Vehicle Inputs
const vehicleInputs = vehicleFormContainer.querySelectorAll('input');
const vehicleSelections = vehicleFormContainer.querySelectorAll('select');
const brandInput = vehicleInputs[0];
const modelInput = vehicleInputs[1];
const yearInput = vehicleInputs[2];
const imgInput = vehicleInputs[3];
const priceInput = vehicleInputs[4];
const fuelInput = vehicleSelections[0];
const seatsInput = vehicleSelections[1];
//Vehicle button
const vehicleStoreDataButton = document.getElementById('submitVehicle');
const vehicleTable = vehicleDataContainer.querySelector('table');
const vehicleIdEdit = document.getElementById('vehicleIdEdit');


//Navigation with button
const navigation = document.querySelector('nav');
const navButtons = navigation.querySelectorAll('a');

//Panel manipulation
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


//Add new customer
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

//Add new vehicle
class Vehicle{
    constructor(id,brand,model,year,fuel,seats,img,price)
    {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.fuel = fuel;
        this.seats = seats;
        this.img = img;
        this.price = price;
    }
    showVehicleData()
    {
        Vehicle.renderVehicleHtml(this.id,this.brand,this.model,this.year,this.fuel,this.seats,this.img,this.price);
        return this;
    }
    storeVehicle()
    {
        const allData = JSON.parse(localStorage.getItem('vehicles')) ?? [];
        allData.push({id:this.id,brand:this.brand,model:this.model,year:this.year,fuel:this.fuel,seats:this.seats,img:this.img,price:this.price});
        localStorage.setItem('vehicles',JSON.stringify(allData));
    }

    static showAllVehicles()
    {
        if(localStorage.getItem('vehicles')){
            JSON.parse(localStorage.getItem('vehicles')).forEach((item)=>{
                Vehicle.renderVehicleHtml(item.id,item.brand,item.model,item.year,item.fuel,item.seats,item.img,item.price);
        })
    }
    }

     //update element
     updateVehicle(id)
     {
         const newItem = {id:id,brand:this.brand,model:this.model,year:this.year,fuel:this.fuel,seats:this.seats,img:this.img,price:this.price};
         const UpdatedData = JSON.parse(localStorage.getItem('vehicles')).map((item)=>{
             if(item.id == id){
                 return newItem;
             }
             return item;
         })
 
         localStorage.setItem('vehicles', JSON.stringify(UpdatedData));
    }

     static renderVehicleHtml(id,brand,model,year,fuel,seats,img,price)
     {
         const trEl = document.createElement('tr');
                 trEl.innerHTML = `
                     <tr>
                     <td><img src="${img}"></td>
                     <td>${brand}</td>
                     <td>${model}</td>
                     <td>${year}</td>
                     <td>${fuel}</td>
                     <td>${seats}</td>
                     <td>${price} $</td>
                     <td>
                         <button class="edit" data-id="${id}">Edit</button>
                         <button class="delete" data-id="${id}">Delete</button>
                     </td>
                     </tr>
                 `
                 vehicleTable.appendChild(trEl);
     }
    
}

Vehicle.showAllVehicles();

vehicleStoreDataButton.addEventListener('click', (e)=>{
    
    e.preventDefault();
    console.log('you have clicked on vehicle button!');  
    

    if(!vehicleIdEdit.value){
        let id = Math.floor(Math.random() * 1000000);
        const newVehicle = new Vehicle(id,brandInput.value, modelInput.value, yearInput.value, fuelInput.value, seatsInput.value, imgInput.value, priceInput.value);

        newVehicle.showVehicleData().storeVehicle();
    }
    else
    {
        const id = vehicleIdEdit.value;
        const newVehicle = new Vehicle(id,brandInput.value, modelInput.value, yearInput.value, fuelInput.value, seatsInput.value, imgInput.value, priceInput.value);
        newVehicle.updateVehicle(id);
        vehicleStoreDataButton.value = 'Update data';
        vehicleTable.innerHTML = `  
        <tr>
        <th>Picture</th>
        <th>Brand</th>
        <th>Model</th>
        <th>Construction year</th>
        <th>Fuel type</th>
        <th>Number of seats</th>
        <th>Price per day</th>
        <th>Action</th>
      </tr>`;
        Vehicle.showAllVehicles();
    }
    brandInput.value = '';
    modelInput.value = '';
    yearInput.value = '1992';
    fuelInput.value = 'Petrol';
    seatsInput.value = '2';
    imgInput.value = '';
    priceInput.value = '';
});

vehicleDataContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete'))
    {

        //remove from locals
        const id = +e.target.getAttribute("data-id");
        const emps = JSON.parse(localStorage.getItem('vehicles'));
        const newData = emps.filter(item => item.id != id);
        localStorage.setItem('vehicles', JSON.stringify(newData));
        
        // remove from html
        e.target.parentElement.parentElement.remove();

    }
  
    if(e.target.classList.contains('edit'))
    {
        const id = +e.target.getAttribute("data-id");
        const item = JSON.parse(localStorage.getItem('vehicles')).find(item => item.id == id);
        brandInput.value = item.brand;
        modelInput.value = item.model;
        yearInput.value = item.year;
        fuelInput.value = item.fuel;
        seatsInput.value = item.seats;
        imgInput.value = item.img;
        priceInput.value = item.price;
        vehicleIdEdit.value = id;
        vehicleStoreDataButton.value = 'Update data';
        console.log(item);
    }
});

