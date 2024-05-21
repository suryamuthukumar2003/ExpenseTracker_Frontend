import { useState ,useContext,useEffect} from "react";
import { UserContext } from "../expense";
const ExpenseForm = ({ addExpense ,updateExpense}) => {
  // const [title, setTitle] = useState("");
  // const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState({});

  const {
    title,
    setTitle,
    amount,
    setAmount,
    showUpdateForm,
    setShowUpdateForm,
    id
  } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};

    if (title.length < 3) {
      err.title = "Title should be atleast 3 characters long";
    }
    if (!amount) {
      err.amount = "Enter a valid amount";
    }

    if (Object.keys(err).length > 0) {
      setErrors({ ...err });
      return;
    }

    addExpense(title, amount);
    setTitle("");
    setAmount(0);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    updateExpense(title, amount,id);
    setTitle("");
    setAmount(0);
    console.log("updated");
    setShowUpdateForm(false);
  };
  useEffect(() => {
    setTitle(title);
    setAmount(amount);
  }, [showUpdateForm]);


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors({ ...errors, title: "" });
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setErrors({ ...errors, amount: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
        {errors.title ? <div className="error">{errors.title}</div> : null}
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
        {errors.amount ? <div className="error">{errors.amount}</div> : null}
      </div>
      {/* <button type="submit">Add Transaction</button> */}
      {showUpdateForm ? (
        <button type="submit" onClick={handleSubmitUpdate} disabled={!title}>
          Update Transaction
        </button>
      ) : (
        <button type="submit" onClick={handleSubmit} disabled={!title}>
          Add Transaction
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
