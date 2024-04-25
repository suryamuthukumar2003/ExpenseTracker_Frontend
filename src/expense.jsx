import { useEffect, useState } from "react";
import ExpenseForm from "./components/expenseForm";
import ExpenseItem from "./components/expenseItem";

export default function Expense() {
  <h1>Expense Tracker</h1>;
  const [expenses, setExpenses] = useState([]);
  const[dummy,setDummy]=useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState({
    amount: 0,
    expense: 0,
    balance: 0,
  });

  const addExpense = (title, amount) => {
    // if(expenses.length===0){
    //   setExpenses([{id:1,title:title,amount:amount}]);
    // }
    // else{
    //   const nextId = expenses[expenses.length - 1].id + 1;
    //   setExpenses([...expenses, { id: nextId, title: title, amount: amount }]);

    fetch('http://localhost:8000/expense/new/6620b2cb493793282298fb97',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        amount:amount,
        userID:"6620b2cb493793282298fb97",
        category:title,
        date:new Date()
      }),
    }).then(()=>setDummy((prev)=>!prev)).catch((err)=>console.log(err));
    }

  const deleteExpense = (id) => {
    // setExpenses(expenses.filter((exp) => exp.id !== id));

    fetch(`http://localhost:8000/expense/delete/${id}`,{
      method:"DELETE",
      
    }).then(()=>{setDummy((prev)=>!prev)}).catch((err)=>console.log(err));
  };


  const updateExpense=(id,amount,title)=>{
    fetch(`http://localhost:8000/expense/update/${id}`,{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        amount:amount,
        userID:"6620b2cb493793282298fb97",
        category:title,
        date:new Date()
      }),
    }).then(()=>setDummy((prev)=>!prev)).catch((err)=>console.log(err));
  }
  useEffect(()=>{
    fetch("http://localhost:8000/expense/all/6620b2cb493793282298fb97").then((res)=>res.json()).then((data)=>setExpenses(data)).catch((err)=>console.log(err));
  },[dummy])

  useEffect(() => {
    let income = 0,
      expense = 0;
    expenses.forEach((exp) => {
      if (exp.amount > 0) {
        income += parseFloat(exp.amount);
      } else {
        expense += parseFloat(exp.amount);
      }
    });

    const balance = income + expense;

    setCalculatedAmount({
      income: parseFloat(income),
      expense: parseFloat(expense),
      balance,
    });
  }, [expenses]);

  return (
    <div>
      <div>
        <div>Expense Tracker</div>
        <div className="balance">Balance: {calculatedAmount.balance}</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>{calculatedAmount.income}</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>{calculatedAmount.expense}</span>
          </div>
        </div>
        <ExpenseForm addExpense={addExpense} />
      </div>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          title={expense.category}
          amount={expense.amount}
          id={expense._id}
          updateExpense={updateExpense}
          deleteExpense={deleteExpense}
        />
      ))}
    </div>
  );
}
