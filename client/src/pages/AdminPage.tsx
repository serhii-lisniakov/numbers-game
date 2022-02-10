import React, {useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {LayoutWrapper} from "../components/Layout";
import styled from "styled-components";
import {Header} from "../components/Header";
import {Rounds} from "../models/Rounds";
import {Input} from "../components/Input";
import {useHttp} from "../hooks/http.hook";

type Player = {
    name: string;
    email: string;
    r1: Rounds;
    r2: Rounds;
    r3: Rounds;
    r4: Rounds;
}

type TableRowProps = {
    isHeader?: boolean;
    player?: Player;
}

type State = {
    admin: boolean;
    players?: Player[];
}

const initialState = {
    name: '',
    email: '',
    r1: Rounds.Grid,
    r2: Rounds.Grid,
    r3: Rounds.Grid,
    r4: Rounds.Grid,
}

const Player: React.FC<TableRowProps> = ({isHeader, player}) => {
    const [form, setForm] = useState<Player>(initialState);

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
        if (player) {
            // @ts-ignore
            player[event.target.name] = event.target.value;
        }
    };

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
                    {idx < 2 ? (
                        <input name={key} value={form[key as keyof Player]} onChange={changeHandler}/>)
                        :
                        <select name={key} value={form[key as keyof Player]} onChange={changeHandler}>
                            <option value={Rounds.Grid}>Grid</option>
                            <option value={Rounds["No Grid"]}>No Grid</option>
                            <option value={Rounds["Grid - No Num. 15"]}>Grid - No Num. 15</option>
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
    const {request} = useHttp();
    const isAdmin = (location.state as State)?.admin;

    const addPlayer = () => {
        setPlayers([...players, initialState])
    }

    const start = async () => {
        try {
            await request('/api/send-invites', 'POST', {
                players
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    if (!isAdmin) return <Navigate to="/"/>
    return (
        <LayoutWrapper>
            <Container>
                <Header title={'Admin'}/>
                <div>
                    <Input
                        isValid={true}
                        value='Add Player'
                        name='name'
                        type="submit"
                        onClick={() => addPlayer()}
                    />
                </div>
                <TableWrapper>
                    <Player isHeader={true}/>
                    {players.map((player, i) => (<Player key={i} player={player}/>))}
                </TableWrapper>
                <div>
                    <Input
                        isValid={true}
                        value='Start Game'
                        name='name'
                        type="submit"
                        onClick={() => start()}
                    />
                </div>
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
    padding: 0 10px;
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

  input, select {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 18px;
    transition: .3s;
    border-radius: 5px;
    
    :hover {
      background: blanchedalmond;
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
