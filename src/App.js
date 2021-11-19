import { Component } from "react";
import productData from "./data/productData";
import formatPrice from "./helpers/formatPrice";
import "./App.css";

class App  extends Component {
  constructor(){
    super()

    this.state = {
      products: productData,
      itemsInCart: [],
      firstName: "",
      lastName: "",
      email: "",
      creditCard: "",
      zipCode: "",
     
    }
  }



  handleAddToCart =(product)=>{
    this.setState({
      itemsInCart: [ ...this.state.itemsInCart, product ],
    })
    
  }

  calcSubtotal =()=>{
      
    return( this.state.itemsInCart.map((item)=> item.price).reduce((a,b)=>{
      return a+b
    },0)
    )
  }

  handleInputs = (event)=> {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleBuyNow = (event)=>{
    event.preventDefault()
    let tax = this.calcSubtotal() * .05

    if(this.state.creditCard.length !== 16){
      alert("Credit card number is not valid")
    }
    else if(this.state.zipCode.length !== 5){
      alert("Zip code is not valid")
    }
    else if(this.state.firstName === "" || this.state.lastName === "" || this.state.email === ""){
      alert("Input is not valid")
    }else{
      alert(`Purchase complete you will be charged $${ formatPrice(this.calcSubtotal() + tax) }`)
    }


    
  }


  
  
  
  render(){
    
    let itemsCard = this.state.products.map((product)=>{
      return(
          <div className="product">
            <h3>{product.name}</h3>
            <div>Price: {formatPrice(product.price)}</div>
            <div>
              <button onClick={()=>this.handleAddToCart(product)} type="submit">Add To Cart</button>
            </div>
            <img src={product.img} alt= "product"/>
            <div>{product.description}</div>
          </div>
      )
    })

    let list = this.state.itemsInCart.map((product)=>{
      return <li>{product.name}: {formatPrice(product.price)}</li>
    })

    let tax = this.calcSubtotal() * .05

    return (
      <div className="app">
        <h1>My Garage Sale</h1>
        
        <div className="products">
        {itemsCard}
        </div>

        <div className="cart-container">
          <h2>Cart</h2>
          <ul>
          {list}
          </ul>
          <h3>Subtotal: {formatPrice(this.calcSubtotal())}</h3>
          <h3>Tax: {formatPrice(tax)}</h3>
          <h3>Total: {formatPrice(this.calcSubtotal() + tax)}</h3>
        </div>

        <div className="checkout-container">
          <h2>Checkout</h2>
          <form id="checkout" onSubmit={this.handleBuyNow}>
            <label htmlFor="first-name">First Name</label>
            <input onChange={this.handleInputs} value={this.state.firstName} name="firstName" id="first-name" type="text"/>
            <br/>
            <label htmlFor="last-name">Last Name</label>
            <input onChange={this.handleInputs} name="lastName" id="last-name" type="text"/>
            <br/>
            <label htmlFor="email">Email</label>
            <input  onChange={this.handleInputs} name="email" id="email" type="email"/>
            <br />
            <label htmlFor="credit-card">Credit Card</label>
            <input onChange={this.handleInputs}  name="creditCard" id="credit-card" type="text"/>
            <br />
            <label htmlFor="zip-code">Zip Code</label>
            <input  onChange={this.handleInputs} name="zipCode" id="zip-code" type="number" />
            <br />
            <button type="submit">Buy Now</button>
          </form>
        </div>
      </div>
    )
    

  }
};

export default App;
