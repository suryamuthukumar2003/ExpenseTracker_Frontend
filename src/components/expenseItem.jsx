import { UserContext } from "../expense";
import { useContext,useState } from "react";
const ExpenseItem = (props) => {
  const { id, title, amount, deleteExpense ,date} = props
  const {setTitle,setAmount,setShowUpdateForm,setId}=useContext(UserContext);


  const handleUpdateContext = () => {
    // document.getElementById("top").scrollIntoView({ behavior: "smooth" });
    setTitle(title);
    setAmount(amount);
    setId(id);
    // updateExpense(updatedTitle, updatedAmount,id);
    setShowUpdateForm(true);
  };
  const format=(date)=>{
    const datee=new Date(date)
    const year = datee.getFullYear().toString();
    const month = (datee.getMonth() + 1).toString().padStart(2, "0");
    const day = datee.getDate().toString().padStart(2, "0");
    const format = `${year}-${month}-${day}`;
    return format;
  }
  return (
    <div className="expense-item-container">
      <div className={`expense-item ${amount > 0 ? 'positive' : 'negative'}`}>
        <div className="expense-title">{title}</div>
        <div className="expense-amount">{format(date)}</div>
        <div className="expense-amount">{amount}</div>
      </div>
      <button className="update-btn" onClick={() =>handleUpdateContext()}>Update</button>
      <button className="delete-btn" onClick={() => {
          if (confirm("Are you sure!") == true) {
            deleteExpense(id);
          } else {
            console.log("cancelled");
          }
        }}
        >Delete
        </button>
    </div>
  )
}

export default ExpenseItem;