import { useEffect, useState, createContext } from "react";
import ExpenseForm from "./components/expenseForm";
import ExpenseItem from "./components/expenseItem";
import { useCookies } from "react-cookie";
import Logout from "./components/Logout";

const UserContext = createContext();

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [dummy, setDummy] = useState(false);
  const [calculatedAmount, setCalculatedAmount] = useState({
    amount: 0,
    expense: 0,
    balance: 0,
  });
  const [cookies] = useCookies(["token"]);
  const addExpense = (title, amount) => {
    // if(expenses.length===0){
    //   setExpenses([{id:1,title:title,amount:amount}]);
    // }
    // else{
    //   const nextId = expenses[expenses.length - 1].id + 1;
    //   setExpenses([...expenses, { id: nextId, title: title, amount: amount }]);
    const currentDate = new Date();
    // const year = currentDate.getFullYear().toString();
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    // const day = currentDate.getDate().toString().padStart(2, "0");
    // const format = `${year}-${month}-${day}`;
    fetch(`${import.meta.env.VITE_API_URL}/expense/new/${cookies.userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({
        amount: amount,
        userID: cookies.userID,
        category: title,
        date: currentDate,
      }),
    })
      .then(() => setDummy((prev) => !prev))
      .catch((err) => console.log(err));
  };

  const deleteExpense = (id) => {
    // setExpenses(expenses.filter((exp) => exp.id !== id));

    fetch(`${import.meta.env.VITE_API_URL}/expense/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${cookies.token}` },
    })
      .then(() => {
        setDummy((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const updateExpense=(title,amount,id)=>{
    fetch(`${import.meta.env.VITE_API_URL}/expense/update/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body:JSON.stringify({
        amount:amount,
        userID:cookies.userID,
        category:title,
        date:new Date()
      }),
    }).then(()=>setDummy((prev)=>!prev)).catch((err)=>console.log(err));
  }
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/expense/all/${cookies.userID}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.log(err));
  }, [dummy]);

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

  // const [toggle, setToggle] = useState(false);
  // const handleToggle = () => {
  //   setToggle(!toggle);
  //   if (toggle) {
  //     document.body.style.backgroundColor = "rgb(138, 138, 138)";
  //   } else {
  //     document.body.style.backgroundColor = "ghostwhite";
  //   }
  // };

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    var onlineState=document.querySelector("#online-state");
    if(isOnline){
      setTimeout(()=>{
        onlineState.style.display="none";
      },2000);
    }
    onlineState.style.display="block";
  }, [isOnline]);

  return (
    <UserContext.Provider
      value={{
        title,
        setTitle,
        amount,
        setAmount,
        showUpdateForm,
        setShowUpdateForm,
        id,
        setId,
      }}
    >

    <>
      <div>
      <div className="navout">
            <div>
              <h3>Expense Tracker</h3>
            </div>
            <div>
              <Logout />
            </div>
          </div>
          <p id="online-state" className={isOnline ? "expense-online" : "expense-offline"}>
        {isOnline ? 'back online' : 'no connection'}
      </p>
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
        <ExpenseForm addExpense={addExpense} updateExpense={updateExpense}/>
      </div>
      {expenses.map((expense) => (
        
        <ExpenseItem
        key={expense._id}
        title={expense.category}
          amount={expense.amount}
          id={expense._id}
          date={expense.date}
          deleteExpense={deleteExpense}
          />
        ))}
    </>
    </UserContext.Provider>
  );
}


export{Expense,UserContext};