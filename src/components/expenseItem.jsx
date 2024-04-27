const ExpenseItem = (props) => {
  const { id, title, amount, deleteExpense ,date ,updateExpense} = props

  const handleDelete = () => {
    deleteExpense(id)
  }

  const handleUpdate=()=>{
    updateExpense(id)
  }
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
      <button className="delete-btn" onClick={handleUpdate}>Delete</button>
      <button className="delete-btn" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ExpenseItem;