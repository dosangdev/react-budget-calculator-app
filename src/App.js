import { useEffect, useState } from "react";
import "./App.css";
import Button01 from "./components/commons/Button01";
import Input01 from "./components/commons/Input01";
import Lists from "./components/Lists";
import { PriceReg } from "./commons/utils";

const initialBudgetList = localStorage.getItem("budgetList")
  ? JSON.parse(localStorage.getItem("budgetList"))
  : [];

function App() {
  const [budgetList, setBudgetList] = useState(initialBudgetList);
  const [budgetText, setBudgetText] = useState("");
  const [editBudgetText, setEditBudgetText] = useState("");
  const [budgetCost, setBudgetCost] = useState(0);
  const [editBudgetCost, setEditBudgetCost] = useState(0);
  const [sumCost, setSumCost] = useState(0);
  const [isAlert, setIsAlert] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    if (isEdit) {
      if (!editBudgetText.trim() || editBudgetCost <= 0) {
        alert("모든 필드를 채워주세요.");
        return;
      }

      let newBudgetList = budgetList.map((el) => {
        if (editId === el.id) {
          return {
            ...el,
            budgetText: editBudgetText,
            budgetCost: editBudgetCost,
          };
        }
        return el;
      });

      setBudgetList(newBudgetList);
      localStorage.setItem("budgetList", JSON.stringify(newBudgetList));
      setIsEdit(false);
      setBudgetText("");
      setBudgetCost(0);

      return;
    }

    if (!budgetText.trim() || budgetCost <= 0) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    let newBudgetListItem = {
      id: Date.now(),
      budgetText: budgetText,
      budgetCost: budgetCost,
    };

    let updatedBudgetList = [...budgetList, newBudgetListItem];
    setBudgetList(updatedBudgetList);
    localStorage.setItem("budgetList", JSON.stringify(updatedBudgetList));

    setBudgetText("");
    setBudgetCost(0);

    setIsAlert(true);
    setCreate(true);

    setTimeout(() => {
      setIsAlert(false);
      setCreate(false);
    }, 2000);
  };

  useEffect(() => {
    const total = budgetList.reduce(
      (sum, item) => sum + Number(item.budgetCost),
      0
    );
    setSumCost(total);
  }, [budgetList]);

  const handleBudgetTextChange = (e) => {
    if (isEdit) {
      setEditBudgetText(e.target.value);
    }
    setBudgetText(e.target.value);
  };

  const handleBudgetCostChange = (e) => {
    if (isEdit) {
      setEditBudgetCost(e.target.value);
    }
    setBudgetCost(e.target.value);
  };

  return (
    <div className="w-screen h-screen bg-bg font-sans">
      <div className="px-10 py-8">
        <div
          className={`${isAlert ? "block" : "hidden"} w-full text-center ${
            create || edit ? "bg-success" : "bg-fail"
          } text-white py-5 mb-2 rounded-md text-xl font-medium`}
        >
          {`아이템이 ${
            create || edit ? (create ? "생성" : "수정") : "삭제"
          }되었습니다.`}
        </div>
        <p className="text-2xl font-bold">예산 계산기</p>
        <div className="bg-white px-8 pt-7 mt-4">
          <div className="flex justify-between">
            <div className="w-[50%]">
              <p className="text-bg text-lg font-medium">지출 항목</p>
              <Input01
                type="text"
                placeholder="예) 렌탈비"
                setBudgetText={setBudgetText}
                onChange={handleBudgetTextChange}
                budgetText={budgetText}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            </div>
            <div className="w-[50%]">
              <p className="text-bg text-lg font-medium">비용</p>
              <Input01
                type="number"
                placeholder="0"
                setBudgetCost={setBudgetCost}
                onChange={handleBudgetCostChange}
                budgetCost={budgetCost}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            </div>
          </div>
          <Button01
            value={`${isEdit ? "수정" : "제출"}`}
            send="send"
            submit="submit"
            remove={false}
            handleSubmit={handleSubmit}
          />

          <Lists
            budgetList={budgetList}
            setBudgetList={setBudgetList}
            setIsAlert={setIsAlert}
            // edit={edit}
            setEdit={setEdit}
            // isEdit={isEdit}
            setIsEdit={setIsEdit}
            setEditId={setEditId}
          />
          <Button01
            value="목록 지우기"
            remove={true}
            setBudgetList={setBudgetList}
            setIsAlert={setIsAlert}
          />
        </div>
        <div className="mt-3 text-2xl font-normal text-right">
          총 지출:{PriceReg(sumCost)}원
        </div>
      </div>
    </div>
  );
}

export default App;
