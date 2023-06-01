import styled from "styled-components"
import axios from "axios"

export default function HabitCard({habit, token, setRender, render}){
    const { id, name, days } = habit;
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/";
    const checkDay = (day, index) => {
        if (days.includes(index)) {
          return (
            <Day selected={true} key={index}>
              {day}
            </Day>
          );
        } else {
          return (
            <Day selected={false} key={index}>
              {" "}
              {day}
            </Day>
          );
        }
    };

    const CONFIG = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    };

    function deleteHabit(){
        const promise = axios.delete(`${url}/habits/${id}`, CONFIG, {
            status: "Sucesso",
        });
        promise.then((response) => setRender(!render));
        promise.catch((error) => console.log(error.response.data.message));
    }

    return (
        <PageContainer>
            <div>
              <p>{name}</p>
              <button onClick={deleteHabit}>
                  <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
            <div>{weekdays.map((day, index) => checkDay(day, index))}</div>
        </PageContainer>   
    )
}   

const Day = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #d4d4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? "white" : "#DBDBDB")};
  background-color: ${(props) => (props.selected ? "#CFCFCF" : "white")};
`;

const PageContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    p {
      display: flex;
      font-size: 20px;
      flex-wrap: wrap;
    }
  }
`;