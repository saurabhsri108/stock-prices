import { Input } from "./components/Input";
import { useState } from "react";
import Container from "./components/Container";

const profitHTML = (profit, profitPercentage) => {
  return (
    <div
      style={{
        color: "darkgreen",
        backgroundColor: "rgba(0, 100, 0, 0.2)",
        padding: "1rem",
      }}
    >
      <p>Congratulations! 😀</p>
      <p>
        Your profit is {profit} with profit-percent {profitPercentage}%
      </p>
    </div>
  );
};

const lossHTML = (loss, lossPercentage) => {
  return (
    <div
      style={{
        color: "darkred",
        backgroundColor: "rgba(100, 0, 0, 0.2)",
        padding: "1rem",
      }}
    >
      <p>Sorry! 🤕</p>
      <p>
        Your loss is {loss} with loss-percent {lossPercentage}%
      </p>
    </div>
  );
};

function App() {
  const [answer, setAnswer] = useState("");
  const [formData, setFormData] = useState({
    initial_price: "",
    stock_quantity: "",
    current_price: "",
  });

  const handleChanges = (e) => {
    if (!isNaN(e.target.value))
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    else
      setFormData({
        ...formData,
        [e.target.name]: "Only positive number allowed",
      });
  };

  const calculateValue = () => {
    const { initial_price, stock_quantity, current_price } = formData;

    if (!initial_price || !stock_quantity || current_price === "") {
      setAnswer("Risk nahi to Ishq nahi...");
      return;
    }

    if (initial_price > current_price) {
      const loss = (initial_price - current_price) * stock_quantity;
      const lossPercentage = (loss / initial_price) * 100;
      setAnswer(lossHTML(loss, lossPercentage));
      return;
    }

    if (current_price > initial_price) {
      const profit = (current_price - initial_price) * stock_quantity;
      const profitPercentage = (profit / initial_price) * 100;
      setAnswer(profitHTML(profit, profitPercentage));
      return;
    }

    if (initial_price === current_price) {
      setAnswer("The price is still the same, so no profit or loss");
      return;
    }

    setAnswer("Risk nahi to Ishq nahi...");
  };

  return (
    <Container className="flex-col">
      <h1>Investo Tracker App</h1>
      <Input
        label={"Intial Price"}
        id="initial_price"
        name="initial_price"
        value={formData.initial_price}
        min={0}
        onChange={(e) => handleChanges(e)}
      />
      <Input
        label={"Stock Quantity"}
        id="stock_quantity"
        name="stock_quantity"
        value={formData.stock_quantity}
        min={0}
        onChange={(e) => handleChanges(e)}
      />
      <Input
        label={"Current Price"}
        id="current_price"
        name="current_price"
        value={formData.current_price}
        min={0}
        onChange={(e) => handleChanges(e)}
      />
      <button className="btn" onClick={calculateValue}>
        Calculate the value
      </button>
      <div className="output">{answer}</div>
    </Container>
  );
}

export default App;
