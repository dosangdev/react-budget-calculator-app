import React from "react";

export default function Lists(props) {
  const handleItemRemove = (data) => {
    const idToRemove = Number(data.currentTarget.id);

    const updatedBudgetList = props.budgetList.filter(
      (el) => el.id !== idToRemove
    );
    props.setBudgetList(updatedBudgetList);

    localStorage.setItem("budgetList", JSON.stringify(updatedBudgetList));
    props.setIsAlert(true);

    setTimeout(() => {
      props.setIsAlert(false);
    }, 2000);
  };

  const onClickEdit = (data) => {
    props.setIsEdit(true);
    props.setEditId(Number(data.currentTarget.id));
  };

  return (
    <div>
      {props.budgetList.map((data, index) => (
        <div
          className="flex border rounded border-br px-4 py-3 text-lg mb-3"
          key={index}
        >
          <div className="w-[50%]">{data.budgetText}</div>
          <div className="w-[35%] text-br">{data.budgetCost}</div>
          <div className="w-[15%] text-right pr-3">
            <button id={data.id} onClick={onClickEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#4aae51"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-45 inline-block text-transparent cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button id={data.id} onClick={handleItemRemove}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#c55150"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 inline-block text-transparent ml-4 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
