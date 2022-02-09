import React, {useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {LayoutWrapper} from "../components/Layout";
import styled from "styled-components";
import {Header} from "../components/Header";

type Player = {
    name: string;
    email: string;
    r1: string;
    r2: string;
    r3: string;
    r4: string;
}

type TableRowProps = {
    isHeader?: boolean;
}

type State = {
    admin: boolean;
    gamers?: Player[];
}

const initialState = {
    name: '',
    email: '',
    r1: '',
    r2: '',
    r3: '',
    r4: '',
}

const Player: React.FC<TableRowProps> = ({isHeader}) => {
    const [form, setForm] = useState<Player>(initialState);

    const changeHandler = (event: any) => setForm({...form, [event.target.name]: event.target.value});

    const labels = ['Name', 'Email', 'R1', 'R2', 'R3', 'R4']

    if (isHeader) {
        return (
            <TableRow className={'row'}>
                {labels.map((label, idx) => (<div key={idx}>{label}</div>))}
            </TableRow>
        )
    }

    return (
        <TableRow className={'row'}>
            {Object.keys(initialState).map((key, idx) => (
                <div key={idx}>
                    <span className={'label'}>{labels[idx]}:</span>
                    {/*{gamer[key as keyof Player]}*/}
                    {idx < 2 ? (
                        <input name={key} value={form[key as keyof Player]} onChange={changeHandler}/>)
                        :
                        <select name={key} value={form[key as keyof Player]} onChange={changeHandler}>
                            <option>Grid</option>
                            <option>No Grid</option>
                            <option>Grid - No Num. 15</option>
                        </select>
                    }
                </div>
            ))}
        </TableRow>
    )
}

export const AdminPage: React.FC = () => {
    const location = useLocation();
    const [players, setPlayers] = useState<Player[]>([]);
    const isAdmin = (location.state as State)?.admin;

    const addPlayer = () => {
        setPlayers([...players, {
            name: '',
            email: '',
            r1: 'Grid',
            r2: 'Grid',
            r3: 'Grid',
            r4: 'Grid',
        }])
    }

    if (!isAdmin) return <Navigate to="/"/>
    return (
        <LayoutWrapper>
            <Container>
                <Header title={'Admin'}/>
                <div>
                    <button onClick={() => addPlayer()}>Add player</button>
                </div>
                <TableWrapper>
                    <Player isHeader={true}/>
                    {players.map((gamer, i) => (<Player key={i}/>))}
                </TableWrapper>
            </Container>
        </LayoutWrapper>
    )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 20px;
`

const TableWrapper = styled.div`
  overflow-y: scroll;
  margin-bottom: 20px;

  .row {
    border: 1px solid rgba(139, 69, 19, 0.27);
  }

  .row:nth-child(odd) {
    background-color: #e8e8e8;
  }

  .row:nth-child(1) {
    background-color: #b3d6f5;

    > div {
      padding: 5px 10px;
    }
  }

  @media (max-width: 480px) {
    .row:nth-child(1) {
      display: none;
    }
  }
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) repeat(4, 0.5fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  margin-bottom: 5px;

  > div {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .label {
      display: none;
      margin-right: 10px;
      font-weight: bold;
      width: 70px;
    }

    @media (max-width: 480px) {
      justify-content: flex-start;
      padding: 5px;

      .label {
        display: inline;
      }
    }
  }

  @media (max-width: 1366px) {
    grid-template-columns: 1fr repeat(4, 0.5fr);
    > div:nth-child(2) {
      grid-area: 2 / 1 / 3 / 2;
    }

    > div:nth-child(3) {
      grid-area: 1 / 2 / 3 / 3;
    }

    > div:nth-child(4) {
      grid-area: 1 / 3 / 3 / 4;
    }

    > div:nth-child(5) {
      grid-area: 1 / 4 / 3 / 5;
    }

    > div:nth-child(6) {
      grid-area: 1 / 5 / 3 / 6;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    > div:nth-child(1) {
      grid-area: 1 / 1 / 2 / 3;
    }

    > div:nth-child(2) {
      grid-area: 1 / 3 / 2 / 5;
    }

    > div:nth-child(3) {
      grid-area: 2 / 1 / 3 / 2;
    }

    > div:nth-child(4) {
      grid-area: 2 / 2 / 3 / 3;
    }

    > div:nth-child(5) {
      grid-area: 2 / 3 / 3 / 4;
    }

    > div:nth-child(6) {
      grid-area: 2 / 4 / 3 / 5;
    }
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    > div:nth-child(1) {
      grid-area: 1 / 1 / 2 / 2;
    }

    > div:nth-child(2) {
      grid-area: 2 / 1 / 3 / 2;
    }

    > div:nth-child(3) {
      grid-area: 3 / 1 / 4 / 2;
    }

    > div:nth-child(4) {
      grid-area: 4 / 1 / 5 / 2;
    }

    > div:nth-child(5) {
      grid-area: 5 / 1 / 6 / 2;
    }

    > div:nth-child(6) {
      grid-area: 6 / 1 / 7 / 2;
    }
  }
`
