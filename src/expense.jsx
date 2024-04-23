import { useEffect, useState } from "react";
import ExpenseForm from "./components/expenseForm";
import ExpenseItem from "./components/expenseItem";

export default function Expense() {
  <h1>Expense Tracker</h1>;
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Food", amount: -50 },
    { id: 2, title: "Movie", amount: -200 },
    { id: 3, title: "salary", amount: 5000 },
  ]);

  const [calculatedAmount, setCalculatedAmount] = useState({
    amount: 0,
    expense: 0,
    balance: 0,
  });

  const addExpense = (title, amount) => {
    const nextId = expenses[expenses.length - 1].id + 1;
    setExpenses([...expenses, { id: nextId, title: title, amount: amount }]);
  };
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

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
    <>
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
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          id={expense.id}
          deleteExpense={deleteExpense}
        />
      ))}
    </>
  );
}
